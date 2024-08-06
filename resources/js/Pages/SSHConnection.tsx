import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, SiteRecord } from '@/types';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import XTerminalUI from '@/Components/XTerminalUI';
import socket from '@/utils/socket';
import { toast } from 'react-toastify';

type SSHConnectionProps = PageProps & {
    site: SiteRecord;
};

export default ({ auth, site }: SSHConnectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('root@203.188.245.58 -p 8823');

    useEffect(() => {
        if (site.uuid) {
            console.log('UUID for Site Detail', site);
            toast.success(`Successfully Redirected with UUID: ${site.uuid}, `);
        }
    }, []);

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
                <div className="mx-auto items-center sm:px-6 lg:px-8">
                    <XTerminalUI isLoading={isLoading} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

