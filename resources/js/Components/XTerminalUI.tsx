import { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';
import socket from '@/utils/socket';

const instance = new Terminal({
    cursorBlink: true
});
const fitAddon = new FitAddon();
instance.loadAddon(fitAddon);

type TerminalProps = {
    isLoading: boolean;
};

const XTerminalUI = ({ isLoading }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const [term, setTerm] = useState<Terminal | null>(null);

    function resizeScreen() {
        fitAddon.fit();
        socket.emit('resize', { cols: term?.cols, rows: term?.rows });
        console.log(`resize: ${JSON.stringify({ cols: term?.cols, rows: term?.rows })}`);
    }

    useEffect(() => {
        if (terminalRef.current) {
            instance.open(terminalRef.current);
            instance.focus();
            fitAddon.fit();
            setTerm(instance);
            instance.writeln('Welcome to XTerminal');
        }

        window.addEventListener('resize', resizeScreen, false);

        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    }, []);

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            if (term) {
                term.write(data);
                console.log('SSH output:', data);
            }
        });

        socket.on('ssh-ready', () => {
            console.log('SSH connection ready');
        });

        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
        });

        if (term) {
            term.onData((data: string) => {
                socket.emit('ssh-input', data);
            });
        }

        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
        };
    }, [term]);

    useEffect(() => {
        if (isLoading && term) {
            term.clear();
            term.writeln('Connecting to server...');
        }
    }, [isLoading]);

    return (
        <div className={`${!term && 'hidden'}`}>
            <div className="terminal-header">
                <div className="buttons">
                    <span className="button close"></span>
                    <span className="button minimize"></span>
                    <span className="button maximize"></span>
                </div>
            </div>
            <div className="terminal-container">
                <div className="w-full" ref={terminalRef}></div>
            </div>
        </div>
    );
};

export default XTerminalUI;

