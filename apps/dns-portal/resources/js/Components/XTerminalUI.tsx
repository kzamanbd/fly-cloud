import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';
import socket from '@/utils/socket';

const instanceXTerm = new Terminal({
    cursorBlink: true,
    rows: 30
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
        <div className="bg-black text-white p-4 pr-2 rounded-lg w-full font-mono">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm">bash</p>
            </div>
            <div className="mt-4">
                <div className="w-full" ref={terminalRef}></div>
            </div>
        </div>
    );
};

export default XTerminalUI;

