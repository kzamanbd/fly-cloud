import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEventHandler, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TerminalView from '@/Components/TerminalView';
import Modal from '@/Components/Modal';

export default ({ auth }: PageProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: 'Test Connection',
        host: '203.188.245.58',
        port: '8823',
        username: 'root',
        password: 'Monon$#Web.12',
        privateKeyPath: ''
    });

    const [sessionId, setSessionId] = useState('');
    const [command, setCommand] = useState('');

    useEffect(() => {
        if (command) {
            if (command.endsWith('\r')) {
                commandHandler(command.slice(0, -1).trim());
                setCommand('');
            }
        }
    }, [command]);

    const commandHandler = (txt: string) => {
        window.axios.post(route('ssh.exec'), { sessionId, command: txt });
    };

    window.Echo.channel('ssh').listen('SSHEvent', (event: any) => {
        console.log('Event', event);
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('ssh.connect'), {
            onSuccess: (data) => {
                setSessionId(data.props.sshSessionId as string);
                toggleModalHandler();
            },
            onError: (errors) => {
                console.log('Errors', errors);
                setSessionId('');
            }
        });
    };

    const [toggleModal, setToggleModal] = useState(false);
    const toggleModalHandler = () => {
        setToggleModal((prev) => !prev);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        SSH Terminal
                    </h2>
                    <PrimaryButton
                        className="ms-4"
                        onClick={toggleModalHandler}
                        disabled={processing}>
                        Add Connection
                    </PrimaryButton>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto items-center sm:px-6 lg:px-8">
                    {sessionId && <TerminalView sessionId={sessionId} setCommand={setCommand} />}
                </div>
            </div>
            <Modal show={toggleModal} onClose={toggleModalHandler}>
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

                    <div className="flex items-center mt-4">
                        <PrimaryButton className="justify-center w-full" disabled={processing}>
                            Connect SSH
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

