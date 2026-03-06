import React from 'react';
import FileDropZone from './FileDropZone';
import TextPasteInput from './TextPasteInput';
import LayoutToggle from './LayoutToggle';

interface Props {
    rawData: string[][];
    onData: (data: string[][]) => void;
    radioState: string;
    onRadioChange: (state: string) => void;
    onBack: () => void;
    onCreateTable: () => void;
}

export default function CreateNew({rawData, onData, radioState, onRadioChange, onBack, onCreateTable}: Props) {
    const cols = rawData.length > 0 ? rawData[0]?.length ?? 0 : 0;

    return (
        <div>
            <div className="step-nav">
                <button className="back-btn label label-inactive" onClick={onBack}>
                    ← Back
                </button>
                <p className="label secTitle">Create new table</p>
            </div>

            <div className="container">
                <FileDropZone onData={onData} />
            </div>

            <div className="container">
                <TextPasteInput onData={onData} />
            </div>

            {rawData.length > 0 && (
                <div className="container">
                    <p className="label label-inactive data-preview">
                        {rawData.length} rows × {cols} columns detected
                    </p>
                </div>
            )}

            <div className="container">
                <div className="sectionTitle">
                    <p className="label secTitle">Layout</p>
                </div>
            </div>

            <div className="container">
                <LayoutToggle value={radioState} onChange={onRadioChange} />
            </div>

            <div className="container">
                <div
                    className={`button${rawData.length === 0 ? ' button-disabled' : ''}`}
                    onClick={rawData.length > 0 ? onCreateTable : undefined}
                >
                    <p className="label">Create table</p>
                </div>
            </div>
        </div>
    );
}
