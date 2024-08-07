import InputLabel from './InputLabel';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import { FormEventHandler, useState } from 'react';
import SecondaryButton from './SecondaryButton';
import socket from '@/utils/socket';

type SSHModalProps = {
    isOpen: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    kickStartCommand?: string;
    action: (data?: any) => void;
    setIsLoading: (loading: boolean) => void;
    isLoading: boolean;
};

export default ({ action, isLoading, maxWidth = 'md', ...props }: SSHModalProps) => {
    const [host, setHost] = useState('203.188.245.58');
    const [port, setPort] = useState('8823');
    const [username, setUsername] = useState('root');
    const [password, setPassword] = useState('Monon$#Web.12');
    const [name, setName] = useState('Test Connection');

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        props.setIsLoading(true);
        socket.emit('ssh', {
            host: host,
            port: port || 22,
            username: username,
            password: password // or private key
        });
        action();
    };

    return (
        <Modal show={props.isOpen} onClose={() => action()} maxWidth={maxWidth} {...props}>
            <form
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5"
                onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="ssh-host" value="Host" />

                    <TextInput
                        id="ssh-host"
                        type="text"
                        name="ssh-host"
                        value={host}
                        className="mt-1 block w-full"
                        autoComplete="ssh-host"
                        onChange={(e) => setHost(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="ssh-port" value="Port" />

                    <TextInput
                        id="ssh-port"
                        type="text"
                        name="ssh-port"
                        value={port}
                        className="mt-1 block w-full"
                        onChange={(e) => setPort(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="ssh-user" value="Port" />

                    <TextInput
                        id="ssh-user"
                        type="text"
                        name="ssh-user"
                        value={username}
                        className="mt-1 block w-full"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        className="mt-1 block w-full"
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center mt-4 gap-3 justify-end">
                    <SecondaryButton className="mr-2" onClick={action}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={isLoading}>Connect</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

