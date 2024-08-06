import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, SiteRecord } from '@/types';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TerminalView from '@/Components/TerminalView';
import socket from '@/utils/socket';

type SSHConnectionProps = PageProps & {
    site: SiteRecord;
};

export default ({ auth, site }: SSHConnectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('root@203.188.245.58 -p 8823');

    if (site.uuid) {
        console.log('UUID for Site Detail', site);
    }

    const removeElement = () => {
        document.getElementById('alert-uuid')?.remove();
    };

    const connectSSH = (e: React.FormEvent) => {
        e.preventDefault();

        // extract host, port, username, password from input
        const username = input.split('@')[0];
        const host = input.split('@')[1].split('-p')[0].trim();
        const port = input.split('@')[1].split('-p')[1].trim();
        if (!username || !host) {
            alert('Invalid input format, expected: username@host -p port');
            return;
        }

        // input password in prompt
        // const password = prompt('Enter password');
        const password = 'Monon$#Web.12';
        if (!password) {
            alert('Password required');
            return;
        }
        if (confirm('Are you sure to connect?')) {
            setIsLoading(true);

            const config = {
                host: host,
                port: port || 22,
                username: username,
                password: password, // or private key
                [site.path ? 'kickStartCommand' : '']: `cd ${site.path}`
            };

            socket.emit('ssh', config);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="grid grid-cols-2 justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        SSH Terminal
                    </h2>
                    <form onSubmit={connectSSH} className="flex w-full">
                        <input
                            type="text"
                            value={input}
                            className="form-input rounded-r-none"
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="root@13.54.100.2 -p 22"
                            required
                        />
                        <PrimaryButton
                            type="submit"
                            disabled={isLoading}
                            className="border-l-0 rounded-l-none h-full border-0">
                            Connect
                        </PrimaryButton>
                    </form>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto items-center sm:px-6 lg:px-8">
                    {site.uuid && !isLoading && (
                        <div
                            id="alert-uuid"
                            className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                            role="alert">
                            <svg
                                className="flex-shrink-0 w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {`Successfully Redirected with UUID: ${site.uuid}`}
                                Please give your credentials and click on connect.
                            </div>
                            <button
                                type="button"
                                className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                                onClick={removeElement}
                                aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    <TerminalView isLoading={isLoading} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

