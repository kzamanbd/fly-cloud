"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = void 0;
const ssh2_1 = require("ssh2");
const logger_1 = require("./utils/logger");
const socketConnection = (socket) => {
    logger_1.logger.info('Client connected', socket.id);
    socket.on('ssh', ({ kickStartCommand, ...config }) => {
        const client = new ssh2_1.Client();
        logger_1.logger.info('Client :: connecting...');
        const sshReady = () => {
            logger_1.logger.info('Client :: ready');
            socket.emit('ssh-ready');
            socket.emit('title', `ssh://${config.username}@${config.host}`);
            client.shell((err, stream) => {
                if (err) {
                    socket.emit('ssh-error', err.message);
                    logger_1.logger.error(`Shell error: ${err.message}`);
                    return;
                }
                // Handle kick-start command without showing its output
                if (kickStartCommand) {
                    stream.write(kickStartCommand + '\n');
                }
                socket.on('ssh-input', (data) => {
                    stream.write(data);
                });
                socket.on('resize', (data) => {
                    stream.setWindow(data.rows, data.cols);
                    logger_1.logger.info(`SOCKET RESIZE: ${JSON.stringify([data.rows, data.cols])}`);
                });
                stream.on('data', (data) => {
                    socket.emit('ssh-output', data.toString('utf-8'));
                });
                stream.on('close', () => {
                    client.end();
                });
                stream.stderr.on('data', (data) => {
                    logger_1.logger.error(`STDERR: ${data}`);
                });
            });
        };
        client.on('ready', sshReady);
        client.on('error', (err) => {
            logger_1.logger.error(`SSH Connection error: ${err.message}`);
            socket.emit('ssh-error', `SSH Connection error: ${err.message}`);
        });
        client.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => {
            logger_1.logger.info('Keyboard-interactive authentication requested.');
            // Handle keyboard-interactive authentication here
            socket.emit('ssh-keyboard-interactive', { name, instructions, instructionsLang, prompts });
            socket.on('ssh-keyboard-interactive-response', (responses) => {
                finish(responses);
            });
        });
        client.on('banner', (message) => {
            logger_1.logger.info(`SSH Banner: ${message}`);
            socket.emit('ssh-banner', message);
        });
        client.on('close', () => {
            logger_1.logger.info('SSH connection closed');
            socket.emit('ssh-close');
        });
        try {
            client.connect(config);
        }
        catch (err) {
            socket.emit('ssh-error', 'Connection error: ' + err.message);
        }
    });
    socket.on('disconnect', () => {
        logger_1.logger.info('Client disconnected');
    });
};
exports.socketConnection = socketConnection;
//# sourceMappingURL=socket.js.map