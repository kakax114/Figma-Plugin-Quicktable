import React, {useState} from 'react';

interface Props {
    qtFrames: {id: string; name: string}[];
    onBack: () => void;
    onSelect: (id: string, name: string) => void;
}

export default function PickExisting({qtFrames, onBack, onSelect}: Props) {
    const [selectedId, setSelectedId] = useState<string>(qtFrames[0]?.id || '');

    const handleLoad = () => {
        const frame = qtFrames.find((f) => f.id === selectedId);
        if (frame) onSelect(frame.id, frame.name);
    };

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
                <p className="label secTitle">Edit existing table</p>
            </div>

            <div className="container">
                <div className="qt-frame-list">
                    {qtFrames.map((f) => (
                        <div
                            key={f.id}
                            className={`qt-frame-item${selectedId === f.id ? ' qt-frame-item--selected' : ''}`}
                            onClick={() => setSelectedId(f.id)}
                        >
                            <p className="label">{f.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <div
                    className={`button${!selectedId ? ' button-disabled' : ''}`}
                    onClick={selectedId ? handleLoad : undefined}
                >
                    <p className="label">Load table</p>
                </div>
            </div>
        </div>
    );
}
