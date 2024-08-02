import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

type TerminalProps = {
    host: string;
    username: string;
    password: string;
};

const TerminalView = ({ host, username, password }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const socketRef = useRef(null) as any;

    useEffect(() => {
        const term = new Terminal();
        term.open(terminalRef.current);

        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onopen = () => {
            term.writeln('WebSocket connection established');
            socketRef.current.send(JSON.stringify({ host, username, password, command: 'whoami' }));
        };

        socketRef.current.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.output) {
                term.writeln(data.output);
            } else if (data.error) {
                term.writeln(`Error: ${data.error}`);
            }
        };

        term.onData((data) => {
            socketRef.current.send(JSON.stringify({ command: data }));
        });

        return () => {
            term.dispose();
            socketRef.current.close();
        };
    }, [host, username, password]);

    return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalView;

