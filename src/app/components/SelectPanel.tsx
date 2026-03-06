import React, {useState, useEffect} from 'react';
import Toggle from './Toggle';

interface Props {
    activeTableId: string | null;
    returnArray: any[];
}

export default function SelectPanel({activeTableId, returnArray}: Props) {
    const [command, setCommand] = useState('');
    const [direction, setDirection] = useState(0);
    const [textMode, setTextMode] = useState(false);
    const [invertSelect, setInvertSelect] = useState(false);

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            const msg = event.data?.pluginMessage;
            if (msg?.type === 'direction-wrapped') {
                setDirection(msg.direction);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCommand = (input: string, move: number, selectText: boolean, isInverted: boolean) => {
        setCommand(input);
        setDirection(move);
        setTextMode(selectText);
        setInvertSelect(isInverted);
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'command',
                    command: input,
                    direction: move,
                    textMode: selectText,
                    invertSelect: isInverted,
                    activeTableId,
                },
            },
            '*'
        );
    };

    const showTextModeToggle =
        command === 'all' ||
        command === 'topHeader' ||
        command === 'sideHeader' ||
        command === 'oddRows' ||
        command === 'evenRows' ||
        command === 'oddCols' ||
        command === 'evenCols';

    return (
        <div>
            <div className="container">
                <div className="sectionTitle">
                    <p className="label secTitle">Select</p>
                </div>
                {showTextModeToggle && (
                    <div className="wraper">
                        <p className={textMode ? 'label' : 'label label-inactive'}>Text mode</p>
                        <Toggle
                            checked={textMode}
                            onChange={() => handleCommand(command, direction, !textMode, invertSelect)}
                        />
                    </div>
                )}
            </div>

            {returnArray.length === 0 ? (
                <div className="container">
                    <p className="label label-inactive">Create your first table to enable options.</p>
                </div>
            ) : (
                <div className="container">
                    <div className="options">
                        <div
                            className={command === 'all' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('all', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" />
                                    <rect x="11.5" y="1" width="7.5" height="7.5" rx="1.5" />
                                    <rect x="1" y="11.5" width="7.5" height="7.5" rx="1.5" />
                                    <rect x="11.5" y="11.5" width="7.5" height="7.5" rx="1.5" />
                                </svg>
                            </div>
                            <p className="label">All cells</p>
                        </div>

                        <div
                            className={command === 'topHeader' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('topHeader', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="1" y="1" width="18" height="5" rx="1.5" />
                                    <rect x="1" y="9" width="8" height="4.5" rx="1" opacity="0.35" />
                                    <rect x="11" y="9" width="8" height="4.5" rx="1" opacity="0.35" />
                                    <rect x="1" y="15.5" width="8" height="3.5" rx="1" opacity="0.35" />
                                    <rect x="11" y="15.5" width="8" height="3.5" rx="1" opacity="0.35" />
                                </svg>
                            </div>
                            <p className="label">Top header</p>
                            {command === 'topHeader' && (
                                <div className="option-nav" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('topHeader', direction - 1, textMode, invertSelect)
                                        }
                                    >
                                        ‹
                                    </button>
                                    <span className="option-nav__label">Row {direction + 1}</span>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('topHeader', direction + 1, textMode, invertSelect)
                                        }
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className={command === 'sideHeader' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('sideHeader', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="1" y="1" width="5" height="18" rx="1.5" />
                                    <rect x="9" y="1" width="4.5" height="8" rx="1" opacity="0.35" />
                                    <rect x="15.5" y="1" width="3.5" height="8" rx="1" opacity="0.35" />
                                    <rect x="9" y="11" width="4.5" height="8" rx="1" opacity="0.35" />
                                    <rect x="15.5" y="11" width="3.5" height="8" rx="1" opacity="0.35" />
                                </svg>
                            </div>
                            <p className="label">Side header</p>
                            {command === 'sideHeader' && (
                                <div className="option-nav" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('sideHeader', direction - 1, textMode, invertSelect)
                                        }
                                    >
                                        ‹
                                    </button>
                                    <span className="option-nav__label">Col {direction + 1}</span>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('sideHeader', direction + 1, textMode, invertSelect)
                                        }
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className={command === 'oddRows' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('oddRows', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="20" height="4" rx="1" />
                                    <rect x="0" y="8" width="20" height="4" rx="1" opacity="0.3" />
                                    <rect x="0" y="16" width="20" height="4" rx="1" />
                                </svg>
                            </div>
                            <p className="label">Odd rows</p>
                        </div>

                        <div
                            className={command === 'evenRows' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('evenRows', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="20" height="4" rx="1" opacity="0.3" />
                                    <rect x="0" y="8" width="20" height="4" rx="1" />
                                    <rect x="0" y="16" width="20" height="4" rx="1" opacity="0.3" />
                                </svg>
                            </div>
                            <p className="label">Even rows</p>
                        </div>

                        <div
                            className={command === 'oddCols' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('oddCols', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="4" height="20" rx="1" />
                                    <rect x="8" y="0" width="4" height="20" rx="1" opacity="0.3" />
                                    <rect x="16" y="0" width="4" height="20" rx="1" />
                                </svg>
                            </div>
                            <p className="label">Odd columns</p>
                        </div>

                        <div
                            className={command === 'evenCols' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('evenCols', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="4" height="20" rx="1" opacity="0.3" />
                                    <rect x="8" y="0" width="4" height="20" rx="1" />
                                    <rect x="16" y="0" width="4" height="20" rx="1" opacity="0.3" />
                                </svg>
                            </div>
                            <p className="label">Even columns</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
