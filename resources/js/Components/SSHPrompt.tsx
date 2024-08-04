import { useForm } from '@inertiajs/react';
import InputError from './InputError';
import InputLabel from './InputLabel';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import { FormEventHandler, useEffect } from 'react';
import SecondaryButton from './SecondaryButton';

type SSHModalProps = {
    isOpen: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    kickStartCommand?: string;
    action: (data?: any) => void;
};

export default ({ isOpen, action, ...props }: SSHModalProps) => {
    const { data, setData, post, processing, errors } = useForm({
        name: 'Test Connection',
        host: '203.188.245.58',
        port: '8823',
        username: 'root',
        password: 'Monon$#Web.12',
        privateKeyPath: '',
        kickStartCommand: ''
    });

    useEffect(() => {
        if (props.kickStartCommand) {
            setData('kickStartCommand', props.kickStartCommand);
        }
    }, [props.kickStartCommand]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('ssh.connect'), {
            onSuccess: (data) => {
                action(data);
            },
            onError: (errors) => {
                console.log('Errors', errors);
            }
        });
    };

    return (
        <Modal show={isOpen} onClose={action} {...props}>
            <form
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5"
                onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
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
                        value={data.host}
                        className="mt-1 block w-full"
                        autoComplete="ssh-host"
                        onChange={(e) => setData('host', e.target.value)}
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
                        value={data.port}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('port', e.target.value)}
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
                        value={data.username}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('username', e.target.value)}
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
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {props.kickStartCommand && (
                    <div className="mt-4">
                        <InputLabel htmlFor="kickStartCommand" value="Kick Start Command" />

                        <TextInput
                            id="kickStartCommand"
                            type="text"
                            name="kickStartCommand"
                            value={data.kickStartCommand}
                            className="mt-1 block w-full"
                            autoComplete="kickStartCommand"
                            readOnly
                        />
                    </div>
                )}

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

