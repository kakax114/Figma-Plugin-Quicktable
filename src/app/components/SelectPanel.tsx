import React, {useState, useEffect} from 'react';
import Toggle from './Toggle';

interface Props {
    activeTableId: string | null;
    returnArray: any[];
}

export default function SelectPanel({activeTableId, returnArray}: Props) {
    const [command, setCommand] = useState('');
    const [direction, setDirection] = useState(0);
    const [textMode, setTextMode] = useState(false);
    const [invertSelect, setInvertSelect] = useState(false);

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            const msg = event.data?.pluginMessage;
            if (msg?.type === 'direction-wrapped') {
                setDirection(msg.direction);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCommand = (input: string, move: number, selectText: boolean, isInverted: boolean) => {
        setCommand(input);
        setDirection(move);
        setTextMode(selectText);
        setInvertSelect(isInverted);
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'command',
                    command: input,
                    direction: move,
                    textMode: selectText,
                    invertSelect: isInverted,
                    activeTableId,
                },
            },
            '*'
        );
    };

    const showTextModeToggle =
        command === 'all' ||
        command === 'topHeader' ||
        command === 'sideHeader' ||
        command === 'oddRows' ||
        command === 'evenRows' ||
        command === 'oddCols' ||
        command === 'evenCols';

    return (
        <div>
            <div className="container">
                <div className="sectionTitle">
                    <p className="label secTitle">Select</p>
                </div>
                {showTextModeToggle && (
                    <div className="wraper">
                        <p className={textMode ? 'label' : 'label label-inactive'}>Text mode</p>
                        <Toggle
                            checked={textMode}
                            onChange={() => handleCommand(command, direction, !textMode, invertSelect)}
                        />
                    </div>
                )}
            </div>

            {returnArray.length === 0 ? (
                <div className="container">
                    <p className="label label-inactive">Create your first table to enable options.</p>
                </div>
            ) : (
                <div className="container">
                    <div className="options">
                        <div
                            className={command === 'all' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('all', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="37"
                                    height="37"
                                    viewBox="0 0 37 37"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M32.6945 0H4.30546C1.93409 0 0 1.93409 0 4.30545V32.6945C0 35.0659 1.93409 37 4.30546 37H32.6945C35.0659 37 37 35.0659 37 32.6945V4.30545C37 1.93409 35.0491 0 32.6945 0ZM3.36364 4.30545C3.36364 3.78409 3.78409 3.36364 4.30546 3.36364H11.7727V11.7727H3.36364V4.30545ZM11.7727 33.6364H4.30546C3.78409 33.6364 3.36364 33.2159 3.36364 32.6945V25.2273H11.7727V33.6364ZM3.36364 21.8636V15.1364H11.7727V21.8636H3.36364ZM21.8636 33.6364H15.1364V25.2273H21.8636V33.6364ZM20.4173 21.8636H16.5827C15.7755 21.8636 15.1364 21.2077 15.1364 20.4173V16.4818C15.1364 15.7418 15.7418 15.1364 16.4818 15.1364H20.4509C21.2246 15.1364 21.8636 15.7755 21.8636 16.5491V20.4173C21.8636 21.2077 21.2077 21.8636 20.4173 21.8636ZM21.8636 11.7727H15.1364V3.36364H21.8636V11.7727ZM33.6364 32.6945C33.6364 33.2159 33.2159 33.6364 32.6945 33.6364H25.2273V25.2273H33.6364V32.6945ZM33.6364 21.8636H25.2273V15.1364H33.6364V21.8636ZM33.6364 11.7727H25.2273V3.36364H32.6945C33.2159 3.36364 33.6364 3.78409 33.6364 4.30545V11.7727Z" />
                                </svg>
                            </div>
                            <p className="label">All cells</p>
                        </div>

                        <div
                            className={command === 'topHeader' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('topHeader', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.6427 0H2.69719C1.29719 0 0.169922 1.12727 0.169922 2.52727V17.4727C0.169922 18.8727 1.29719 20 2.69719 20H17.6427C19.0427 20 20.1699 18.8727 20.1699 17.4727V2.52727C20.1699 1.12727 19.0336 0 17.6427 0ZM8.35174 7.27273H11.9881V11.8182H8.35174V7.27273ZM6.53356 18.1818H2.69719C2.30628 18.1818 1.9881 17.8636 1.9881 17.4727V13.6364H6.53356V18.1818ZM6.53356 11.8182H1.9881V8.05455C1.9881 7.62727 2.33356 7.27273 2.76992 7.27273H6.53356V11.8182ZM8.35174 13.6364H11.9881V18.1818H8.35174V13.6364ZM18.3517 17.4727C18.3517 17.8636 18.0336 18.1818 17.6427 18.1818H13.8063V13.6364H18.3517V17.4727ZM18.3517 11.8182H13.8063V7.27273H17.5608C17.9972 7.27273 18.3517 7.62727 18.3517 8.06364V11.8182Z" />
                                </svg>
                            </div>
                            <p className="label">Top header</p>
                            {command === 'topHeader' && (
                                <div className="option-nav" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('topHeader', direction - 1, textMode, invertSelect)
                                        }
                                    >
                                        ‹
                                    </button>
                                    <span className="option-nav__label">Row {direction + 1}</span>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('topHeader', direction + 1, textMode, invertSelect)
                                        }
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className={command === 'sideHeader' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('sideHeader', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.6427 0H2.69719C1.29719 0 0.169922 1.12727 0.169922 2.52727V17.4727C0.169922 18.8727 1.29719 20 2.69719 20H17.6427C19.0427 20 20.1699 18.8727 20.1699 17.4727V2.52727C20.1699 1.12727 19.0427 0 17.6427 0ZM8.26993 1.81818H11.9881V6.36364H7.44265V2.64545C7.44265 2.19091 7.80629 1.81818 8.26993 1.81818ZM7.44265 8.18182H11.9881V11.8182H7.44265V8.18182V8.18182ZM7.44265 13.6364H11.9881V18.1818H8.3881C7.86083 18.1818 7.44265 17.7545 7.44265 17.2364V13.6364V13.6364ZM18.3517 17.4727C18.3517 17.8636 18.0336 18.1818 17.6427 18.1818H13.8063V13.6364H18.3517V17.4727ZM18.3517 11.8182H13.8063V8.18182H18.3517V11.8182ZM18.3517 6.36364H13.8063V1.81818H17.6427C18.0336 1.81818 18.3517 2.13636 18.3517 2.52727V6.36364Z" />
                                </svg>
                            </div>
                            <p className="label">Side header</p>
                            {command === 'sideHeader' && (
                                <div className="option-nav" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('sideHeader', direction - 1, textMode, invertSelect)
                                        }
                                    >
                                        ‹
                                    </button>
                                    <span className="option-nav__label">Col {direction + 1}</span>
                                    <button
                                        className="option-nav__btn"
                                        onClick={() =>
                                            handleCommand('sideHeader', direction + 1, textMode, invertSelect)
                                        }
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className={command === 'oddRows' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('oddRows', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="20" height="4" rx="1" fill="currentColor" />
                                    <rect x="0" y="8" width="20" height="4" rx="1" fill="currentColor" opacity="0.3" />
                                    <rect x="0" y="16" width="20" height="4" rx="1" fill="currentColor" />
                                </svg>
                            </div>
                            <p className="label">Odd rows</p>
                        </div>

                        <div
                            className={command === 'evenRows' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('evenRows', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="20" height="4" rx="1" fill="currentColor" opacity="0.3" />
                                    <rect x="0" y="8" width="20" height="4" rx="1" fill="currentColor" />
                                    <rect x="0" y="16" width="20" height="4" rx="1" fill="currentColor" opacity="0.3" />
                                </svg>
                            </div>
                            <p className="label">Even rows</p>
                        </div>

                        <div
                            className={command === 'oddCols' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('oddCols', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="4" height="20" rx="1" fill="currentColor" />
                                    <rect x="8" y="0" width="4" height="20" rx="1" fill="currentColor" opacity="0.3" />
                                    <rect x="16" y="0" width="4" height="20" rx="1" fill="currentColor" />
                                </svg>
                            </div>
                            <p className="label">Odd columns</p>
                        </div>

                        <div
                            className={command === 'evenCols' ? 'option' : 'option option-inactive'}
                            onClick={() => handleCommand('evenCols', 0, textMode, false)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="0" y="0" width="4" height="20" rx="1" fill="currentColor" opacity="0.3" />
                                    <rect x="8" y="0" width="4" height="20" rx="1" fill="currentColor" />
                                    <rect x="16" y="0" width="4" height="20" rx="1" fill="currentColor" opacity="0.3" />
                                </svg>
                            </div>
                            <p className="label">Even columns</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
