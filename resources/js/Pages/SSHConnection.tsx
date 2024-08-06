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

    // ref input for terminal
    const hostRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (site.uuid) {
            console.log('UUID for Site Detail', site);
            toast.success(`Successfully Redirected with UUID: ${site.uuid}, `);
            setIsModal(true);
            hostRef.current?.focus();
        }
    }, []);

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

        setIsLoading(true);

        socket.emit('ssh', {
            host: host,
            port: port || 22,
            username: username,
            [isPrivateKey ? 'privateKey' : 'password']: isPrivateKey ? privateKey : password,
            password: password, // or private key
            [site.path ? 'kickStartCommand' : '']: `cd ${site.path}`
        });

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
        if (!isModal) {
            setInput('');
            setPassword('');
            setPrivateKey('');
            setIsPrivateKey(false);
        }
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
                        Connect
                    </PrimaryButton>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <XTerminalUI isLoading={isLoading} setIsLoading={setIsLoading} />
                </div>
            </div>
            <Modal show={isModal} maxWidth="md">
                <form className="shadow-sm sm:rounded-lg p-5" onSubmit={connectSSH}>
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
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        {isPrivateKey ? (
                            <input
                                id="password"
                                type="file"
                                name="password"
                                onChange={handlePrivateKey}
                                className="mt-1 block w-full border-1 p-1.5"
                            />
                        ) : (
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                className="mt-1 block w-full"
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
                        <SecondaryButton className="mr-2" onClick={toggleModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={isLoading}>Connect</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

