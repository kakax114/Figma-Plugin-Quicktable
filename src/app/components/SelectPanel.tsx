import React, {useState} from 'react';
import Toggle from './Toggle';

interface Props {
    returnArray: any[];
}

export default function SelectPanel({returnArray}: Props) {
    const [command, setCommand] = useState('');
    const [direction, setDirection] = useState(0);
    const [textMode, setTextMode] = useState(false);
    const [invertSelect, setInvertSelect] = useState(false);

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
                },
            },
            '*'
        );
    };

    return (
        <div>
            <div className="container">
                <div className="sectionTitle">
                    <p className="label secTitle">Select</p>
                </div>
                {(command === 'all' || command === 'topHeader' || command === 'sideHeader') && (
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
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                {command === 'topHeader' && (
                    <div className="wraper">
                        <div
                            className="tab tab-inactive"
                            onClick={() => handleCommand(command, direction - 1, textMode, invertSelect)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M11.0094 0.420648L19.5794 8.89065C19.8594 9.16065 19.9994 9.53065 19.9994 9.88065C19.9994 10.2406 19.8594 10.6006 19.5794 10.8806C19.0294 11.4406 18.1094 11.4406 17.5594 10.8806L11.4294 4.82065L11.4294 18.5906C11.4294 19.3706 10.7894 20.0006 9.99939 20.0006C9.20939 20.0006 8.56939 19.3706 8.56939 18.5906L8.56939 4.82065L2.43939 10.8806C1.88939 11.4406 0.969389 11.4406 0.419389 10.8806C-0.140611 10.3206 -0.140611 9.44065 0.419389 8.88065L8.98939 0.410648C9.53939 -0.139352 10.4594 -0.139352 11.0094 0.420648Z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className="tab tab-inactive"
                            onClick={() => handleCommand(command, direction + 1, textMode, invertSelect)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.99 19.5794L0.42 11.1094C0.14 10.8394 -4.16625e-07 10.4694 -4.31924e-07 10.1194C-4.4766e-07 9.75941 0.14 9.39941 0.42 9.11941C0.969999 8.55941 1.89 8.55941 2.44 9.11941L8.57 15.1794L8.57 1.40941C8.57 0.629412 9.21 -0.000587866 10 -0.0005879C10.79 -0.000587935 11.43 0.629412 11.43 1.40941L11.43 15.1794L17.56 9.11941C18.11 8.55941 19.03 8.55941 19.58 9.11941C20.14 9.67941 20.14 10.5594 19.58 11.1194L11.01 19.5894C10.46 20.1394 9.54 20.1394 8.99 19.5794Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                {command === 'sideHeader' && (
                    <div className="wraper">
                        <div
                            className="tab tab-inactive"
                            onClick={() => handleCommand(command, direction - 1, textMode, invertSelect)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0.420038 8.99L8.89004 0.42C9.16004 0.14 9.53004 0 9.88004 0C10.24 0 10.6 0.14 10.88 0.42C11.44 0.97 11.44 1.89 10.88 2.44L4.82004 8.57H18.59C19.37 8.57 20 9.21 20 10C20 10.79 19.37 11.43 18.59 11.43H4.82004L10.88 17.56C11.44 18.11 11.44 19.03 10.88 19.58C10.32 20.14 9.44004 20.14 8.88004 19.58L0.410038 11.01C-0.139962 10.46 -0.139962 9.54 0.420038 8.99Z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className="tab tab-inactive"
                            onClick={() => handleCommand(command, direction + 1, textMode, invertSelect)}
                        >
                            <div className="icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M19.58 11.01L11.11 19.58C10.84 19.86 10.47 20 10.11 20C9.75 20 9.39 19.86 9.11 19.58C8.55 19.03 8.55 18.11 9.11 17.56L15.17 11.43H1.41C0.63 11.43 0 10.79 0 10C0 9.21 0.63 8.57 1.41 8.57H15.18L9.12 2.44C8.56 1.89 8.56 0.97 9.12 0.42C9.68 -0.14 10.56 -0.14 11.12 0.42L19.59 8.99C20.14 9.54 20.14 10.46 19.58 11.01Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
