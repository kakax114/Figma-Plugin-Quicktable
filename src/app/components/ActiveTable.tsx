import React, {useState} from 'react';
import LayoutToggle from './LayoutToggle';
import SelectPanel from './SelectPanel';

interface Props {
    activeTableId: string | null;
    activeTableName: string;
    returnArray: any[];
    radioState: string;
    onToggleConfirm: (newState: string) => void;
    onBack: () => void;
}

export default function ActiveTable({
    activeTableId,
    activeTableName,
    returnArray,
    radioState,
    onToggleConfirm,
    onBack,
}: Props) {
    const [pendingState, setPendingState] = useState<string | null>(null);

    const handleToggleClick = (newState: string) => {
        if (newState === radioState) return;
        setPendingState(newState);
    };

    const handleConfirm = () => {
        if (pendingState) {
            onToggleConfirm(pendingState);
            setPendingState(null);
        }
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
                <p className="label active-table-name">{activeTableName}</p>
            </div>

            <div className="container">
                <LayoutToggle value={radioState} onChange={handleToggleClick} />
            </div>

            {pendingState && (
                <div className="warning-banner">
                    <p className="label label-inactive">Changing the layout resets table styles.</p>
                    <div className="warning-actions">
                        <button className="warn-btn warn-btn--cancel" onClick={() => setPendingState(null)}>
                            Cancel
                        </button>
                        <button className="warn-btn warn-btn--confirm" onClick={handleConfirm}>
                            Continue
                        </button>
                    </div>
                </div>
            )}

            <hr className="divider" />

            <SelectPanel activeTableId={activeTableId} returnArray={returnArray} />
        </div>
    );
}
