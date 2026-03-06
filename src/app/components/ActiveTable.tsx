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
                <button className="back-btn label label-inactive" onClick={onBack}>
                    ← Back
                </button>
                <p className="label active-table-name">{activeTableName}</p>
            </div>

            <div className="container">
                <div className="sectionTitle">
                    <p className="label secTitle">Layout</p>
                </div>
            </div>

            <div className="container">
                <LayoutToggle value={radioState} onChange={handleToggleClick} />
            </div>

            {pendingState && (
                <div className="warning-banner">
                    <p className="label label-inactive">
                        Changing layout recreates the table — row/column frame styling will reset. Cell styling is kept.
                    </p>
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
