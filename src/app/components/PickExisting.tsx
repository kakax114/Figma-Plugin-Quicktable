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
                <button className="back-btn label label-inactive" onClick={onBack}>
                    ← Back
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
