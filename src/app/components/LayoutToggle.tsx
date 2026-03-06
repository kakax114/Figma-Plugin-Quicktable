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
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.37937 0.0599976H4.12812C4.88778 0.0599976 5.5075 0.679716 5.5075 1.43937V20.6806C5.5075 21.4403 4.88778 22.06 4.12812 22.06H1.37937C0.619718 22.05 0 21.4403 0 20.6806V1.43937C0 0.679716 0.619718 0.0599976 1.37937 0.0599976ZM9.61563 0.0599976H12.3644C13.124 0.0599976 13.7438 0.679716 13.7438 1.43937V20.6806C13.7438 21.4403 13.124 22.06 12.3644 22.06H9.61563C8.85597 22.06 8.23626 21.4403 8.23626 20.6806V1.43937C8.24625 0.679716 8.86597 0.0599976 9.61563 0.0599976ZM17.8719 0.0599976H20.6206C21.3803 0.0599976 22 0.679716 22 1.43937V20.6806C22 21.4403 21.3803 22.06 20.6206 22.06H17.8719C17.1122 22.06 16.4925 21.4403 16.4925 20.6806V1.43937C16.4925 0.679716 17.1122 0.0599976 17.8719 0.0599976Z" />
                    </svg>
                </div>
                <p className="label">Column</p>
            </div>
            <div
                className={value === 'tableByRow' ? 'tab' : 'tab tab-inactive'}
                onClick={() => !disabled && onChange('tableByRow')}
            >
                <div className="icon">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.17 1.25455V3.74545C20.17 4.43636 19.6064 5 18.9155 5H1.42459C0.733681 5 0.170044 4.43636 0.170044 3.74545V1.25455C0.170044 0.563636 0.733681 0 1.42459 0H18.9155C19.6064 0 20.17 0.563636 20.17 1.25455ZM18.9155 7.5H1.42459C0.733681 7.5 0.170044 8.06364 0.170044 8.74545V11.2545C0.170044 11.9364 0.733681 12.5 1.42459 12.5H18.9155C19.6064 12.5 20.17 11.9364 20.17 11.2545V8.74545C20.17 8.06364 19.6064 7.5 18.9155 7.5ZM18.9155 15H1.42459C0.733681 15 0.170044 15.5636 0.170044 16.2545V18.7455C0.170044 19.4364 0.733681 20 1.42459 20H18.9155C19.6064 20 20.17 19.4364 20.17 18.7455V16.2545C20.17 15.5636 19.6064 15 18.9155 15Z" />
                    </svg>
                </div>
                <p className="label">Row</p>
            </div>
        </div>
    );
}
