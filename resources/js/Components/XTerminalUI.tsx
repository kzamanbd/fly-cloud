import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';
import socket from '@/utils/socket';

const instanceXTerm = new Terminal({
    cursorBlink: true
});
const fitAddon = new FitAddon();
instanceXTerm.loadAddon(fitAddon);

type TerminalProps = {
    isLoading: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

const XTerminalUI = ({ isLoading, setIsLoading }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const [xTerm, setXTerm] = useState<Terminal | null>(null);

    const resizeScreen = () => {
        fitAddon.fit();
        socket.emit('resize', { cols: xTerm?.cols, rows: xTerm?.rows });
        console.log(`resize: ${JSON.stringify({ cols: xTerm?.cols, rows: xTerm?.rows })}`);
    };

    useEffect(() => {
        if (terminalRef.current) {
            instanceXTerm.open(terminalRef.current);
            instanceXTerm.focus();
            fitAddon.fit();
            setXTerm(instanceXTerm);
            instanceXTerm.writeln('Welcome to XTerminal');
            instanceXTerm.write('\x1b[31m$ \x1b[0m');
            resizeScreen();
        }

        window.addEventListener('resize', resizeScreen, false);

        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    }, []);

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            if (xTerm) {
                xTerm.write(data);
            }
        });

        socket.on('ssh-ready', () => {
            console.log('SSH connection ready');
            xTerm?.writeln('SSH connection ready');
            if (setIsLoading) {
                setIsLoading(false);
            }
        });

        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
            xTerm?.writeln(`Error: ${err}`);
            if (setIsLoading) {
                setIsLoading(false);
            }
        });

        if (xTerm) {
            xTerm.onData((data: string) => {
                socket.emit('ssh-input', data);
            });
        }

        socket.on('title', (data: string) => {
            document.title = data;
        });

        xTerm?.onTitleChange((title) => {
            document.title = title;
        });

        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
            socket.off('title');
        };
    }, [xTerm]);

    useEffect(() => {
        if (isLoading && xTerm) {
            xTerm.clear();
            xTerm.writeln('Connecting to server...');
        }
    }, [isLoading]);

    return (
        <div>
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

