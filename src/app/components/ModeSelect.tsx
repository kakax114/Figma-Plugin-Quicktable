import React from 'react';

interface Props {
    qtFrameCount: number;
    onCreateNew: () => void;
    onPickExisting: () => void;
}

export default function ModeSelect({qtFrameCount, onCreateNew, onPickExisting}: Props) {
    return (
        <div className="mode-select">
            <div className="mode-select__header">
                <p className="label">Quick Table</p>
            </div>
            <div className="mode-select__options">
                <div className="mode-card" onClick={onCreateNew}>
                    <div className="mode-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="10" height="10" rx="2" />
                            <rect x="13" y="1" width="10" height="10" rx="2" opacity="0.4" />
                            <rect x="1" y="13" width="10" height="10" rx="2" opacity="0.4" />
                            <rect x="13" y="13" width="10" height="10" rx="2" opacity="0.4" />
                        </svg>
                    </div>
                    <p className="label mode-card__label">Create new table</p>
                    <div className="mode-card__arrow">›</div>
                </div>

                <div
                    className={`mode-card${qtFrameCount === 0 ? ' mode-card--disabled' : ''}`}
                    onClick={qtFrameCount > 0 ? onPickExisting : undefined}
                >
                    <div className="mode-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="10" height="10" rx="2" opacity="0.4" />
                            <rect x="13" y="1" width="10" height="10" rx="2" opacity="0.4" />
                            <rect x="1" y="13" width="10" height="10" rx="2" opacity="0.4" />
                            <rect x="13" y="13" width="10" height="10" rx="2" opacity="0.4" />
                            <path d="M15.5 4.5C16.1 3.9 17.1 3.9 17.7 4.5C18.3 5.1 18.3 6.1 17.7 6.7L16.5 7.9L14.3 5.7L15.5 4.5Z" />
                            <path d="M13 7.2L8 12.2V14.2H10L15 9.2L13 7.2Z" opacity="0.85" />
                        </svg>
                    </div>
                    <p className="label mode-card__label">
                        Edit existing{qtFrameCount > 0 ? ` (${qtFrameCount})` : ''}
                    </p>
                    {qtFrameCount > 0 && <div className="mode-card__arrow">›</div>}
                </div>
            </div>
        </div>
    );
}
