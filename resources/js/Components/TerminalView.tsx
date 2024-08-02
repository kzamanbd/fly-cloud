import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

type TerminalProps = {
    sessionId: string;
    setCommand: React.Dispatch<React.SetStateAction<string>>;
};
const TerminalView = ({ sessionId, setCommand }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const [term, setTerm] = useState<any>(null);

    const echo = window.Echo;

    useEffect(() => {
        const instance = new Terminal();
        instance.open(terminalRef.current);
        setTerm(instance);
        instance.writeln('Welcome to the SSH Terminal');
        instance.focus();

        const startSession = async () => {
            console.log('Session ID', sessionId);
            echo.channel(`ssh-room-${sessionId}`).listen('SshOutput', (data: any) => {
                console.log('ssh-output data', data);
                if (data.output) {
                    instance.writeln(data.output);
                } else if (data.error) {
                    instance.writeln(`Error: ${data.error}`);
                }
            });
        };

        startSession();

        return () => {
            if (sessionId) {
                fetch('/stop-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sessionId })
                });
                instance.dispose();
                echo.leave(`ssh-room-${sessionId}`);
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
                        return;
                    } else {
                        term.write(data);
                    }
                }

                setCommand((prev) => prev + data);
            });
        }
    }, [term, sessionId]);

    return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalView;

