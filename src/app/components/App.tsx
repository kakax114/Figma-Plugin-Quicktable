import React, {useState, useEffect} from 'react';
import ModeSelect from './ModeSelect';
import CreateNew from './CreateNew';
import PickExisting from './PickExisting';
import ActiveTable from './ActiveTable';
import '../styles/ui.css';

const transposeArray = (arr: string[][]): string[][] => {
    if (arr.length === 0 || arr[0].length === 0) return arr;
    const result: string[][] = [];
    for (let i = 0; i < arr[0].length; i++) {
        const row: string[] = [];
        for (let j = 0; j < arr.length; j++) {
            row.push(arr[j][i] ?? '');
        }
        result.push(row);
    }
    return result;
};

type AppStep = 'mode-select' | 'create-new' | 'pick-existing' | 'active';

const App = () => {
    const [appStep, setAppStep] = useState<AppStep>('mode-select');
    const [rawData, setRawData] = useState<string[][]>([]);
    const [radioState, setRadioState] = useState('tableByColumn');
    const [returnArray, setReturnArray] = useState([]);
    const [activeTableId, setActiveTableId] = useState<string | null>(null);
    const [activeTableName, setActiveTableName] = useState('');
    const [qtFrames, setQtFrames] = useState<{id: string; name: string}[]>([]);

    useEffect(() => {
        parent.postMessage({pluginMessage: {type: 'scan-tables'}}, '*');

        window.onmessage = (event) => {
            const msg = event.data.pluginMessage;
            if (msg.type === 'create-table') {
                setReturnArray(msg.message);
                setActiveTableId(msg.newFrameId);
                setActiveTableName(msg.newFrameName || '');
                setAppStep('active');
                parent.postMessage({pluginMessage: {type: 'scan-tables'}}, '*');
            }
            if (msg.type === 'qt-frames') {
                setQtFrames(msg.frames);
            }
        };
    }, []);

    const getItems = (state: string) =>
        rawData.length === 0 ? [] : state === 'tableByRow' ? rawData : transposeArray(rawData);

    const sendCreateTable = (state: string, targetFrameId: string | null = null) => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'create-table',
                    items: getItems(state),
                    state,
                    targetFrameId,
                },
            },
            '*'
        );
    };

    // Called from ActiveTable when user confirms the layout toggle warning
    const handleToggleConfirm = (newState: string) => {
        setRadioState(newState);
        sendCreateTable(newState, activeTableId);
    };

    // Called from PickExisting when user loads an existing frame
    const handlePickExisting = (frameId: string, frameName: string) => {
        setActiveTableId(frameId);
        setActiveTableName(frameName);
        setReturnArray([1]); // mark active so SelectPanel shows options
        setAppStep('active');
    };

    return (
        <div>
            {appStep === 'mode-select' && (
                <ModeSelect
                    qtFrameCount={qtFrames.length}
                    onCreateNew={() => setAppStep('create-new')}
                    onPickExisting={() => setAppStep('pick-existing')}
                />
            )}

            {appStep === 'create-new' && (
                <CreateNew
                    rawData={rawData}
                    onData={setRawData}
                    radioState={radioState}
                    onRadioChange={setRadioState}
                    onBack={() => setAppStep('mode-select')}
                    onCreateTable={() => sendCreateTable(radioState, null)}
                />
            )}

            {appStep === 'pick-existing' && (
                <PickExisting
                    qtFrames={qtFrames}
                    onBack={() => setAppStep('mode-select')}
                    onSelect={handlePickExisting}
                />
            )}

            {appStep === 'active' && (
                <ActiveTable
                    activeTableId={activeTableId}
                    activeTableName={activeTableName}
                    returnArray={returnArray}
                    radioState={radioState}
                    onToggleConfirm={handleToggleConfirm}
                    onBack={() => setAppStep('mode-select')}
                />
            )}
        </div>
    );
};

export default App;
