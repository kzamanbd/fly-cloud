import { Client } from 'ssh2';
import { logger } from './utils/logger';

export const socketConnection = (socket: any) => {
    logger.info('Client connected', socket.id);

    socket.on('ssh', ({ kickStartCommand, ...config }: any) => {
        const client = new Client();
        logger.info('Client :: connecting...');

        const sshReady = () => {
            logger.info('Client :: ready');
            socket.emit('ssh-ready');
            client.shell((err: any, stream: any) => {
                if (err) {
                    socket.emit('ssh-error', err.message);
                    return;
                }

                // Handle kick-start command without showing its output
                if (kickStartCommand) {
                    stream.write(kickStartCommand + '\n');
                }

                socket.on('ssh-input', (data: any) => {
                    stream.write(data);
                });

                socket.on('resize', (data: any) => {
                    stream.setWindow(data.rows, data.cols);
                    logger.info(socket, `SOCKET RESIZE: ${JSON.stringify([data.rows, data.cols])}`);
                });

                stream.on('data', (data: any) => {
                    socket.emit('ssh-output', data.toString('utf-8'));
                });

                stream.on('close', () => {
                    client.end();
                });

                stream.stderr.on('data', (data: any) => {
                    console.error(`STDERR: ${data}`);
                });
            });
        };

        client.on('ready', sshReady).connect(config);
    });

    socket.on('disconnect', () => {
        logger.info('Client disconnected');
    });
};
