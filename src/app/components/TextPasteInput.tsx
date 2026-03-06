import React, {useState} from 'react';
import {parseCSV} from '../utils/csvParser';

interface Props {
    onData: (data: string[][]) => void;
}

export default function TextPasteInput({onData}: Props) {
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        onData(parseCSV(val));
    };

    return (
        <div className="text-paste">
            <button className="text-paste__toggle label label-inactive" onClick={() => setExpanded(!expanded)}>
                {expanded ? '▾ Hide text input' : '▸ Or paste text manually'}
            </button>
            {expanded && (
                <textarea placeholder="Paste CSV or spreadsheet data here..." value={text} onChange={handleChange} />
            )}
        </div>
    );
}
