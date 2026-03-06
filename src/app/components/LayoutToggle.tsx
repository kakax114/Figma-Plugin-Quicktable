import React from 'react';

interface Props {
    value: string;
    onChange: (newState: string) => void;
    disabled?: boolean;
}

export default function LayoutToggle({value, onChange, disabled}: Props) {
    return (
        <div className={`tabs${disabled ? ' tabs--disabled' : ''}`}>
            <div
                className={value === 'tableByColumn' ? 'tab' : 'tab tab-inactive'}
                onClick={() => !disabled && onChange('tableByColumn')}
            >
                <div className="icon">
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4.5" height="22" rx="2.25" />
                        <rect x="7.75" width="4.5" height="22" rx="2.25" />
                        <rect x="15.5" width="4.5" height="22" rx="2.25" />
                    </svg>
                </div>
                <p className="label">Column</p>
            </div>
            <div
                className={value === 'tableByRow' ? 'tab' : 'tab tab-inactive'}
                onClick={() => !disabled && onChange('tableByRow')}
            >
                <div className="icon">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="22" height="4.5" rx="2.25" />
                        <rect y="7.75" width="22" height="4.5" rx="2.25" />
                        <rect y="15.5" width="22" height="4.5" rx="2.25" />
                    </svg>
                </div>
                <p className="label">Row</p>
            </div>
        </div>
    );
}
