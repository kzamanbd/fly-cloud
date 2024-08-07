import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, SiteRecord } from '@/types';
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import XTerminalUI from '@/Components/XTerminalUI';
import socket from '@/utils/socket';
import { toast } from 'react-toastify';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';

type SSHConnectionProps = PageProps & {
    site: SiteRecord;
};

export default ({ auth, site }: SSHConnectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('root@203.188.245.58 -p 8823');
    const [isModal, setIsModal] = useState(false);
    const [password, setPassword] = useState('');
    const [isPrivateKey, setIsPrivateKey] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ref input for terminal
    const hostRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (site?.uuid) {
            console.log('UUID for Site Detail', site);
            toast.success(`Successfully Redirected with UUID: ${site.uuid}, `);
            hostRef.current?.focus();

            if (site.private_keys?.length) {
                const key = site.private_keys[0]?.private_key;
                console.log('Connecting with Private Key', key);
                if (site.ip_address && site.port && site.username && key) {
                    connectionAction({
                        host: site.ip_address,
                        port: site.port,
                        username: site.username,
                        key: key.toString()
                    });
                    setInput(`${site.username}@${site.ip_address} -p ${site.port}`);
                }
            }
        }
    }, []);

    const connectionAction = ({
        host,
        port,
        username,
        key,
        password
    }: {
        host: string;
        port: string;
        username: string;
        key?: string;
        password?: string;
    }) => {
        setIsLoading(true);
        console.log('Connecting to SSH', { host, port, username, key, password });
        if (!host || !port || !username || (!key && !password)) {
            toast.error('Host, Port, and Username are required');
            return;
        }
        socket.emit('ssh', {
            host: host,
            port: port || 22,
            username: username,
            [key ? 'privateKey' : 'password']: key ? key : password,
            password: password, // or private key
            [site.path ? 'kickStartCommand' : '']: `cd ${site.path}`
        });
    };

    const connectSSH = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) {
            toast.error('Host is required');
            return;
        }
        // extract host, port, username, password from input
        const username = input.split('@')[0];
        const host = input.split('@')[1]?.split('-p')[0]?.trim();
        const port = input.split('@')[1]?.split('-p')[1]?.trim();
        if (!username || !host) {
            toast.error('Invalid input format, expected: username@host -p port');
            return;
        }

        if (!password && !isPrivateKey) {
            toast.error('Password required');
            return;
        }
        connectionAction({ host, port, username, key: isPrivateKey ? privateKey : '', password });
        toggleModal();
    };

    const handlePrivateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            setPrivateKey(event.target?.result as string);
        };

        reader.onerror = function (event) {
            console.error('Error reading file:', event.target?.error);
        };

        reader.readAsText(file);
    };

    const toggleModal = () => {
        setIsModal(!isModal);
    };

    const closeModal = () => {
        setIsModal(false);
        setInput('');
        setPassword('');
        setPrivateKey('');
        setIsPrivateKey(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        SSH Terminal
                    </h2>

                    <PrimaryButton onClick={toggleModal} disabled={isLoading}>
                        Reconnect
                    </PrimaryButton>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <XTerminalUI isLoading={isLoading} setIsLoading={setIsLoading} />
                </div>
            </div>
            <Modal show={isModal} maxWidth="md" onClose={closeModal}>
                <form onSubmit={connectSSH}>
                    <div>
                        <InputLabel htmlFor="name" value="Host" />

                        <TextInput
                            id="name"
                            name="name"
                            ref={hostRef}
                            value={input}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setInput(e.target.value)}
                            isFocused
                            required
                            placeholder="root@127.0.0.1 -p 22"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        {isPrivateKey ? (
                            <input
                                type="file"
                                id="password"
                                name="password"
                                onChange={handlePrivateKey}
                                className="mt-1 block w-full border-1 p-1.5"
                            />
                        ) : (
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    name="password"
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="*********"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <div
                                    className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <label htmlFor="custom_switch" className="mt-2 flex items-center">
                        <div className="relative h-6 w-12 m-0">
                            <input
                                type="checkbox"
                                id="custom_switch"
                                checked={isPrivateKey}
                                onChange={(e) => setIsPrivateKey(e.target.checked)}
                                className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                            />
                            <span className="block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before-bg-close before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked-before-bg"></span>
                        </div>
                        <span className="mx-2">With Private Key</span>
                    </label>

                    <div className="flex items-center mt-4 gap-3 justify-end">
                        <SecondaryButton className="mr-2" onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={isLoading}>Connect</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

