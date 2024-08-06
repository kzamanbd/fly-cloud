import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TerminalView from '@/Components/TerminalView';
import SSHPrompt from '@/Components/SSHPrompt';

export default ({ auth }: PageProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toggleModalHandler = (value: any = {}) => {
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
                    <PrimaryButton className="ms-4" onClick={() => toggleModalHandler()}>
                        Add Connection
                    </PrimaryButton>
                </div>
            }>
            <Head title="SSHConnection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto items-center sm:px-6 lg:px-8">
                    <TerminalView isLoading={isLoading} />
                </div>
            </div>
            <SSHPrompt
                isOpen={toggleModal}
                action={toggleModalHandler}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </AuthenticatedLayout>
    );
};

