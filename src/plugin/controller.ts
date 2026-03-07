figma.showUI(__html__, {width: 277, height: 460});

//global variables
var message = null;
var command = '';
var input: any[][] = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
];
var id = '';

const scanQTFrames = () => {
    const frames = figma.currentPage.findAll(
        (node) => node.type === 'FRAME' && node.name.startsWith('QT-')
    ) as FrameNode[];
    figma.ui.postMessage({
        type: 'qt-frames',
        frames: frames.map((f) => ({id: f.id, name: f.name})),
    });
};

// Scan on startup so UI can populate the picker immediately
scanQTFrames();

figma.ui.onmessage = (msg) => {
    if (msg.type === 'scan-tables') {
        scanQTFrames();
    }

    if (msg.type === 'focus-table') {
        (async () => {
            const node = await figma.getNodeByIdAsync(msg.frameId);
            if (node && node.type === 'FRAME') {
                figma.currentPage.selection = [node as FrameNode];
                figma.viewport.scrollAndZoomIntoView([node as FrameNode]);
            }
        })();
    }

    if (msg.type === 'command') {
        command = msg.command;
        (async () => {
            const frame = await getFrameById(msg.activeTableId);
            if (!frame) return;

            const selection = allSelect(frame);

            if (command === 'all') {
                figma.currentPage.selection = selection;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(selection);
                }
            }
            if (command === 'sideHeader') {
                const count = getColCount(frame);
                const wrapped = count > 0 ? ((msg.direction % count) + count) % count : 0;
                const nodes = colSelect(frame, wrapped);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
                figma.ui.postMessage({type: 'direction-wrapped', direction: wrapped});
            }
            if (command === 'topHeader') {
                const count = getRowCount(frame);
                const wrapped = count > 0 ? ((msg.direction % count) + count) % count : 0;
                const nodes = rowSelect(frame, wrapped);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
                figma.ui.postMessage({type: 'direction-wrapped', direction: wrapped});
            }
            if (command === 'oddRows') {
                const nodes = strideRowSelect(frame, 0);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
            }
            if (command === 'evenRows') {
                const nodes = strideRowSelect(frame, 1);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
            }
            if (command === 'oddCols') {
                const nodes = strideColSelect(frame, 0);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
            }
            if (command === 'evenCols') {
                const nodes = strideColSelect(frame, 1);
                figma.currentPage.selection = nodes;
                if (msg.textMode) {
                    figma.currentPage.selection = selectText(nodes);
                }
            }
        })();
    }

    if (msg.type === 'create-table') {
        (async () => {
            // If items is empty (pick-existing toggle), extract data from the existing frame
            if (!msg.items || msg.items.length === 0) {
                if (msg.targetFrameId) {
                    const existingNode = await figma.getNodeByIdAsync(msg.targetFrameId);
                    if (existingNode && existingNode.type === 'FRAME') {
                        const existingFrame = existingNode as FrameNode;
                        const currentLayout = getLayoutState(existingFrame);
                        const rawData = extractFrameData(existingFrame);
                        const needsTranspose = currentLayout !== msg.state;
                        input = needsTranspose ? transposeData(rawData) : rawData;
                    }
                }
            } else {
                input = msg.items;
            }

            id = randomId();
            message = msg;
            const arr = [];

            // Remove existing frame first, remember its position for in-place replace
            let replaceX: number | null = null;
            let replaceY: number | null = null;
            if (msg.targetFrameId) {
                const existing = await figma.getNodeByIdAsync(msg.targetFrameId);
                if (existing && existing.type === 'FRAME') {
                    replaceX = (existing as FrameNode).x;
                    replaceY = (existing as FrameNode).y;
                    existing.remove();
                }
            }

            if (message.state === 'tableByRow') {
                const mainFrame = await autoByRow(() => removeTempValueOnEmptyTextCell(), input);
                if (replaceX !== null) {
                    mainFrame.x = replaceX;
                    mainFrame.y = replaceY;
                }
                figma.currentPage.selection = [mainFrame];
                figma.viewport.scrollAndZoomIntoView([mainFrame]);
                figma.ui.postMessage({
                    type: 'create-table',
                    message: [1],
                    newFrameId: mainFrame.id,
                    newFrameName: mainFrame.name,
                });
            } else {
                const mainFrame = autoByCol(() => removeTempValueOnEmptyTextCell(), input, arr);
                if (replaceX !== null) {
                    mainFrame.x = replaceX;
                    mainFrame.y = replaceY;
                }
                figma.currentPage.selection = [mainFrame];
                figma.viewport.scrollAndZoomIntoView([mainFrame]);
                figma.ui.postMessage({
                    type: 'create-table',
                    message: arr,
                    newFrameId: mainFrame.id,
                    newFrameName: mainFrame.name,
                });
            }
        })();
    }
};

// --- Frame lookup ---

const getFrameById = async (frameId: string): Promise<FrameNode | null> => {
    if (frameId) {
        const node = await figma.getNodeByIdAsync(frameId);
        if (node && node.type === 'FRAME') return node as FrameNode;
    }
    // fallback: find by generated id
    const frames = figma.currentPage.findAll((node) => node.name === 'QT-' + id);
    return (frames[0] as FrameNode) || null;
};

// Detect layout from frame structure:
//   HORIZONTAL mainFrame = tableByColumn (children are column frames)
//   VERTICAL   mainFrame = tableByRow    (children are row frames)
const getLayoutState = (frame: FrameNode): 'tableByColumn' | 'tableByRow' => {
    return frame.layoutMode === 'HORIZONTAL' ? 'tableByColumn' : 'tableByRow';
};

// Row and column count helpers
const getRowCount = (frame: FrameNode): number => {
    if (getLayoutState(frame) === 'tableByColumn') {
        const firstCol = frame.children[0] as FrameNode;
        return firstCol ? firstCol.children.filter((c) => c.name === 'Cell').length : 0;
    }
    return frame.children.length;
};

const getColCount = (frame: FrameNode): number => {
    if (getLayoutState(frame) === 'tableByRow') {
        const firstRow = frame.children[0] as FrameNode;
        return firstRow ? firstRow.children.filter((c) => c.name === 'Cell').length : 0;
    }
    return frame.children.length;
};

// Extract cell text data from an existing frame in its natural layout format
const extractFrameData = (frame: FrameNode): string[][] => {
    const data: string[][] = [];
    frame.children.forEach((child) => {
        const childData: string[] = [];
        (child as FrameNode).children.forEach((cell) => {
            if (cell.name === 'Cell') {
                const t = (cell as FrameNode).children.find((c) => c.type === 'TEXT') as TextNode | undefined;
                childData.push(t ? t.characters : '');
            }
        });
        if (childData.length > 0) data.push(childData);
    });
    return data;
};

const transposeData = (arr: string[][]): string[][] => {
    if (arr.length === 0 || arr[0].length === 0) return arr;
    const result: string[][] = [];
    for (let i = 0; i < arr[0].length; i++) {
        const row: string[] = [];
        for (let j = 0; j < arr.length; j++) row.push(arr[j][i] ?? '');
        result.push(row);
    }
    return result;
};

// Collect all Cell nodes from the frame
const allSelect = (frame: FrameNode): SceneNode[] => {
    const selection: SceneNode[] = [];
    frame.children.forEach((child) => {
        (child as FrameNode).children.forEach((cell) => {
            if (cell.name === 'Cell') selection.push(cell);
        });
    });
    return selection;
};

// Select a specific column (sideHeader)
const colSelect = (frame: FrameNode, colIndex: number): SceneNode[] => {
    const state = getLayoutState(frame);
    const select: SceneNode[] = [];

    if (state === 'tableByColumn') {
        const colFrame = frame.children[colIndex] as FrameNode;
        if (!colFrame) return [];
        colFrame.children.forEach((cell) => {
            if (cell.name === 'Cell') select.push(cell);
        });
    } else {
        frame.children.forEach((rowFrame) => {
            const cells = (rowFrame as FrameNode).children.filter((c) => c.name === 'Cell');
            if (cells[colIndex]) select.push(cells[colIndex]);
        });
    }
    return select;
};

// Select a specific row (topHeader)
const rowSelect = (frame: FrameNode, rowIndex: number): SceneNode[] => {
    const state = getLayoutState(frame);
    const select: SceneNode[] = [];

    if (state === 'tableByColumn') {
        frame.children.forEach((colFrame) => {
            const cells = (colFrame as FrameNode).children.filter((c) => c.name === 'Cell');
            if (cells[rowIndex]) select.push(cells[rowIndex]);
        });
    } else {
        const rowFrame = frame.children[rowIndex] as FrameNode;
        if (!rowFrame) return [];
        rowFrame.children.forEach((cell) => {
            if (cell.name === 'Cell') select.push(cell);
        });
    }
    return select;
};

// Select every other row. offset=0 → odd (1st,3rd,...), offset=1 → even (2nd,4th,...)
const strideRowSelect = (frame: FrameNode, offset: number): SceneNode[] => {
    const select: SceneNode[] = [];
    const rowCount = getRowCount(frame);
    for (let r = offset; r < rowCount; r += 2) {
        select.push(...rowSelect(frame, r));
    }
    return select;
};

// Select every other column. offset=0 → odd (1st,3rd,...), offset=1 → even (2nd,4th,...)
const strideColSelect = (frame: FrameNode, offset: number): SceneNode[] => {
    const select: SceneNode[] = [];
    const colCount = getColCount(frame);
    for (let c = offset; c < colCount; c += 2) {
        select.push(...colSelect(frame, c));
    }
    return select;
};

const selectText = (nodes: SceneNode[]): SceneNode[] => {
    const text: SceneNode[] = [];
    nodes.forEach((node) => {
        const found = (node as FrameNode).findChildren((child) => child.type === 'TEXT');
        text.push(...found);
    });
    return text;
};

const autoByCol = (callback, input, arr): FrameNode => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'HORIZONTAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    getCol(input, arr).forEach((col) => {
        mainFrame.appendChild(col);
    });
    mainFrame.name = 'QT-' + id;
    setTimeout(callback, 500);
    return mainFrame;
};

const getCol = (input, col) => {
    for (let i = 0; i < input.length; i++) {
        const row = [];
        for (let j = 0; j < input[i].length; j++) {
            row.push(getText(input[i][j]));
        }
        col.push(getRowFirst(row));
    }
    return col;
};

const getRowFirst = (arr) => {
    const frame = figma.createFrame();
    Promise.all(arr).then((nodes) => {
        frame.layoutMode = 'VERTICAL';
        nodes.forEach((node) => {
            frame.appendChild(node as SceneNode);
        });
        frame.counterAxisSizingMode = 'AUTO';
    });
    return frame;
};

const removeTempValueOnEmptyTextCell = () => {
    const nodes = figma.currentPage.findAll((node) => node.name === '--table0--');
    nodes.forEach((node) => {
        (node as TextNode).characters = ' ';
        node.name = 'Text';
    });
};

const getText = async (i): Promise<FrameNode> => {
    const cell = figma.createFrame();
    cell.name = 'Cell';
    cell.layoutMode = 'HORIZONTAL';
    cell.paddingLeft = 8;
    cell.paddingRight = 8;
    cell.paddingTop = 4;
    cell.paddingBottom = 4;

    const text = figma.createText();
    await figma.loadFontAsync(text.fontName as FontName);
    text.characters = i.toString();
    if (text.characters === '') {
        text.characters = '-';
        text.name = '--table0--';
    }
    cell.appendChild(text);

    if (message.state === 'tableByColumn') {
        cell.primaryAxisSizingMode = 'FIXED';
        cell.counterAxisSizingMode = 'AUTO';
        cell.layoutAlign = 'STRETCH';
    } else {
        // AUTO = hug content in this API version; natural width measurable before column equalization
        cell.primaryAxisSizingMode = 'AUTO';
        cell.counterAxisSizingMode = 'AUTO';
    }
    return cell;
};

const autoByRow = async (callback, input): Promise<FrameNode> => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'VERTICAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    mainFrame.name = 'QT-' + id;

    // Pass 1: create all cells with HUG sizing so natural widths are measurable
    const allCells: FrameNode[][] = [];
    for (const rowData of input) {
        allCells.push(await Promise.all(rowData.map(getText)));
    }

    // Per-column max width (floor at 80px)
    const numCols = allCells[0]?.length ?? 0;
    const colWidths = Array.from({length: numCols}, (_, j) =>
        Math.max(80, ...allCells.map((row) => row[j]?.width ?? 0))
    );

    // Pass 2: fix cell widths and build row frames
    for (const rowCells of allCells) {
        const rowFrame = figma.createFrame();
        rowFrame.layoutMode = 'HORIZONTAL';
        rowFrame.counterAxisSizingMode = 'AUTO';
        rowFrame.primaryAxisSizingMode = 'AUTO';

        rowCells.forEach((cell, j) => {
            cell.primaryAxisSizingMode = 'FIXED';
            cell.resizeWithoutConstraints(colWidths[j], cell.height);
            rowFrame.appendChild(cell);
        });

        mainFrame.appendChild(rowFrame);
    }

    setTimeout(callback, 500);
    return mainFrame;
};

const randomId = () => {
    return Math.random().toString(36).substr(5, 5);
};
