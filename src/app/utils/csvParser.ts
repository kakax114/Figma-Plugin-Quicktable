function parseCSVLine(line: string, delimiter: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === delimiter && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

export function parseCSV(text: string): string[][] {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) return [];
    const delimiter = lines[0].includes('\t') ? '\t' : ',';
    return lines.map((line) => parseCSVLine(line, delimiter));
}
