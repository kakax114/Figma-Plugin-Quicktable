import React, {useState, useRef} from 'react';
import {parseCSV} from '../utils/csvParser';

interface Props {
    onData: (data: string[][]) => void;
}

export default function FileDropZone({onData}: Props) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            onData(parseCSV(text));
            setFileName(file.name);
        };
        reader.readAsText(file);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    return (
        <div
            className={`drop-zone${isDragging ? ' drop-zone--active' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".csv,.tsv,.txt"
                style={{display: 'none'}}
                onChange={onFileInput}
            />
            {fileName ? (
                <p className="label drop-zone__filename">&#10003; {fileName}</p>
            ) : (
                <>
                    <p className="label">Drop CSV / TSV here</p>
                    <p className="label label-inactive drop-zone__sub">or click to browse</p>
                </>
            )}
        </div>
    );
}
