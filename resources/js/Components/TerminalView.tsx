import { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';
import socket from '@/utils/socket';

const TerminalView = ({ isLoading }: { isLoading: boolean }) => {
    const terminalRef = useRef(null) as any;
    const [term, setTerm] = useState<Terminal | null>(null);
    const [command, setCommand] = useState('');

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            if (term) {
                term.write(data);
                console.log('SSH output:', data);
            }
        });
        socket.on('ssh-ready', () => {
            console.log('SSH connection ready');
            const instance = new Terminal({
                cursorBlink: true
            });
            const fitAddon = new FitAddon();
            instance.loadAddon(fitAddon);
            if (terminalRef.current) {
                instance.writeln('Welcome to the SSH Terminal');
                instance.open(terminalRef.current);
                fitAddon.fit();
            }
            setTerm(instance);
        });
        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
        });
        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
        };
    }, [term]);

    // handle terminal input data
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
    }, [term]);

    // handle command submit event
    useEffect(() => {
        if (command) {
            if (command === 'clear') {
                // clear terminal
            } else if (command.endsWith('\r')) {
                // trim command and send to server
                const commandString = command.slice(0, -1).trim();
                socket.emit('ssh-input', commandString + '\n');
                setCommand('');
            }
        }
    }, [command]);

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

