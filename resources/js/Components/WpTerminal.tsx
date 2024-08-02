import { useEffect, useState } from 'react';
import Terminal from 'terminal-in-react';

export default () => {
    const [pid, setPid] = useState(0);
    const [isConnected, setIsConnected] = useState(true);
    const [headerMessage, setHeaderMessage] = useState('Initializing...');

    const handleKeyDown = (event: {
        preventDefault: () => void;
        which: number;
        ctrlKey: any;
        metaKey: any;
    }) => {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
            console.log('CTRL+C Pressed');
            handleCommand(['cancel'], () => {});
        }
    };

    const handleCommand = (input: any, print: Function) => {
        console.log('Input', input);

        if (input[0] === 'cancel') {
            // const body = { id: appSocket.id, pid: pid };
            // axios.post(`http://localhost:4000/kill`, body);
        } else {
            // const body = { id: appSocket.id, command: input.join(' ') };
            // axios.post(`http://localhost:4000/execute`, body);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'black'
            }}
            onKeyDown={handleKeyDown}>
            {isConnected && (
                <Terminal
                    color="black"
                    backgroundColor="white"
                    barColor="white"
                    style={{ fontWeight: 'bold', fontSize: '1.5em' }}
                    msg={headerMessage}
                    commandPassThrough={handleCommand}
                    startState="maximised"
                />
            )}
        </div>
    );
};

