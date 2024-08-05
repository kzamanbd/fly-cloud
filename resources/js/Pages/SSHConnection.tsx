import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TerminalView from '@/Components/TerminalView';
import SSHPrompt from '@/Components/SSHPrompt';

type SSHConnectionProps = PageProps & {
    output: string;
};

export default ({ auth, output }: SSHConnectionProps) => {
    console.log('[SSH Output]', output);

    let params = new URLSearchParams(window.location.search);
    const sessionId = params.get('sessionId') || '';
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
                    <PrimaryButton className="ms-4" onClick={toggleModalHandler}>
                        Add Connection
                    </PrimaryButton>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto items-center sm:px-6 lg:px-8">
                    {sessionId && (
                        <TerminalView
                            output={output}
                            sessionId={sessionId}
                            setCommand={setCommand}
                        />
                    )}
                </div>
            </div>
            <SSHPrompt isOpen={toggleModal} action={toggleModalHandler} maxWidth="md" />
        </AuthenticatedLayout>
    );
};

