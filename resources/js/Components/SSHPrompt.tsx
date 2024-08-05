import InputError from './InputError';
import InputLabel from './InputLabel';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import { FormEventHandler, useState } from 'react';
import SecondaryButton from './SecondaryButton';

type SSHModalProps = {
    isOpen: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    kickStartCommand?: string;
    action: (data?: any) => void;
};

export default ({ isOpen, action, maxWidth = 'md', ...props }: SSHModalProps) => {
    const [host, setHost] = useState('203.188.245.58');
    const [port, setPort] = useState('8823');
    const [username, setUsername] = useState('root');
    const [password, setPassword] = useState('Monon$#Web.12');
    const [name, setName] = useState('Test Connection');
    const [kickStartCommand, setKickStartCommand] = useState(props.kickStartCommand);

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({
        host: '',
        port: '',
        username: '',
        password: '',
        name: ''
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            setProcessing(true);
            const response = await window.axios.post(route('ssh.connect'), {
                host,
                port,
                username,
                password,
                kickStartCommand
            });
            action(response.data);
        } catch (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response?.data.errors);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal show={isOpen} onClose={() => action()} maxWidth={maxWidth} {...props}>
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

                    <InputError message={errors.name} className="mt-2" />
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

                    <InputError message={errors.host} className="mt-2" />
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

                    <InputError message={errors.port} className="mt-2" />
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

                    <InputError message={errors.username} className="mt-2" />
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

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center mt-4 gap-3 justify-end">
                    <SecondaryButton className="mr-2" onClick={action}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing}>Connect</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

