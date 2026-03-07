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
    return (
        <div>
            <div className="step-nav">
                <button className="back-btn" onClick={onBack} aria-label="Back">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <p className="label secTitle">Create new table</p>
            </div>

            <div className="container">
                <FileDropZone onData={onData} />
            </div>

            <div className="container">
                <TextPasteInput onData={onData} />
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
