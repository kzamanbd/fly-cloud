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
                    logger.error(`Shell error: ${err.message}`);
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
                    logger.error(`STDERR: ${data}`);
                });
            });
        };

        client.on('ready', sshReady);

        client.on('error', (err: any) => {
            logger.error(`SSH Connection error: ${err.message}`);
            socket.emit('ssh-error', `SSH Connection error: ${err.message}`);
        });

        client.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => {
            logger.info('Keyboard-interactive authentication requested.');
            // Handle keyboard-interactive authentication here
            socket.emit('ssh-keyboard-interactive', { name, instructions, instructionsLang, prompts });
            socket.on('ssh-keyboard-interactive-response', (responses: any) => {
                finish(responses);
            });
        });

        client.on('banner', (message: any) => {
            logger.info(`SSH Banner: ${message}`);
            socket.emit('ssh-banner', message);
        });

        client.on('close', () => {
            logger.info('SSH connection closed');
            socket.emit('ssh-close');
        });

        client.connect(config);
    });

    socket.on('disconnect', () => {
        logger.info('Client disconnected');
    });
};
