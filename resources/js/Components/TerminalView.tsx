import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';

type TerminalProps = {
    sessionId: string;
    setCommand: React.Dispatch<React.SetStateAction<string>>;
};

const TerminalView = ({ sessionId, setCommand }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const [term, setTerm] = useState<Terminal | null>(null);

    const echo = window.Echo;

    useEffect(() => {
        const instance = new Terminal();
        const fitAddon = new FitAddon();
        instance.loadAddon(fitAddon);
        instance.open(terminalRef.current);
        setTerm(instance);
        fitAddon.fit();

        // ssh-shell is ready

        console.log('Session ID', sessionId);
        echo.channel(`ssh-${sessionId}`).listen('SshOutputEvent', (data: any) => {
            console.log('SSH-Output', data.output);
            if (data.output) {
                instance.write(data.output);
            } else if (data.error) {
                instance.write(`Error: ${data.error}`);
            }
        });

        return () => {
            if (sessionId) {
                window.axios.get('/ssh/kill-session', {
                    params: { sessionId }
                });
                instance.dispose();
                echo.leave(`ssh-room-${sessionId}`);
                setTerm(null);
            }
        };
    }, [sessionId]);

    useEffect(() => {
        if (term) {
            term.onData((data: string) => {
                if (data === '\r') {
                    term.write('\r\n');
                } else {
                    // if click backspace key then remove last character from command
                    if (data.charCodeAt(0) === 127) {
                        term.write('\b \b');
                        setCommand((prev) => prev.slice(0, -1));
                        return;
                    } else {
                        term.write(data);
                    }
                }

                setCommand((prev) => prev + data);
            });
        }
    }, [term, sessionId]);

    return (
        <div className={`terminal ${!term && 'hidden'}`}>
            <div className="terminal-header">
                <div className="buttons">
                    <span className="button close"></span>
                    <span className="button minimize"></span>
                    <span className="button maximize"></span>
                </div>
            </div>
            <div className="terminal-body typewriter">
                <div className="w-full" ref={terminalRef}></div>
            </div>
        </div>
    );
};

export default TerminalView;

