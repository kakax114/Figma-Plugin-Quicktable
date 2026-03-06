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
                <p className="label label-inactive">What would you like to do?</p>
            </div>
            <div className="mode-select__options">
                <div className="mode-card" onClick={onCreateNew}>
                    <div className="mode-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H7V14H10V17ZM10 13H7V10H10V13ZM10 9H7V6H10V9ZM13 12H11V8H13V12ZM13 7H11V5H13V7ZM17 17H11V15H17V17ZM17 13H14V10H17V13ZM17 9H14V6H17V9Z" />
                        </svg>
                    </div>
                    <div className="mode-card__text">
                        <p className="label">Create new table</p>
                        <p className="label label-inactive">Import CSV or paste data</p>
                    </div>
                    <div className="mode-card__arrow">›</div>
                </div>

                <div
                    className={`mode-card${qtFrameCount === 0 ? ' mode-card--disabled' : ''}`}
                    onClick={qtFrameCount > 0 ? onPickExisting : undefined}
                >
                    <div className="mode-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                        </svg>
                    </div>
                    <div className="mode-card__text">
                        <p className="label">Edit existing table</p>
                        <p className="label label-inactive">
                            {qtFrameCount > 0
                                ? `${qtFrameCount} table${qtFrameCount > 1 ? 's' : ''} on this page`
                                : 'No QT tables found on page'}
                        </p>
                    </div>
                    {qtFrameCount > 0 && <div className="mode-card__arrow">›</div>}
                </div>
            </div>
        </div>
    );
}
