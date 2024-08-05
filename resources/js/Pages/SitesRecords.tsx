import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, SiteRecord } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { FormEventHandler, useRef, useState } from 'react';
import { dateFormat } from '@/utils';
import SSHPrompt from '@/Components/SSHPrompt';

type Props = PageProps & {
    sites: SiteRecord[];
};

export default ({ auth, sites }: Props) => {
    console.log(`[sites]`, sites);

    const nameInput = useRef<HTMLInputElement>(null);
    const [siteId, setSiteId] = useState<number | null>(null);

    const [kickStartCommand, setKickStartCommand] = useState<string>('');

    const {
        data: form,
        setData,
        post,
        put,
        processing,
        reset,
        errors
    } = useForm({
        name: '',
        path: ''
    });

    const addSiteRecordAction: FormEventHandler = (e) => {
        e.preventDefault();

        if (siteId) {
            put(route('sites.update', siteId), {
                preserveScroll: true,
                onSuccess: () => toggleModalHandler(),
                onError: () => nameInput.current?.focus(),
                onFinish: () => reset()
            });

            return;
        }

        post(route('sites.store'), {
            preserveScroll: true,
            onSuccess: () => toggleModalHandler(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset()
        });
    };
    const [isModal, setIsModal] = useState(false);
    const toggleModalHandler = () => {
        setIsModal((prev) => !prev);

        reset();
    };

    const siteEditHandler = (site: SiteRecord) => {
        setSiteId(site.id);
        form.name = site.name;
        form.path = site.path;
        toggleModalHandler();
    };

    const [isSshModal, setIsSshModal] = useState(false);

    const sshModalHandler = (site: SiteRecord) => {
        setIsSshModal((prev) => !prev);
        if (site) {
            console.log('SSH Connection', site);
            setKickStartCommand(`cd ${site.path}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Sites</h2>
                    <PrimaryButton
                        className="ms-4"
                        onClick={toggleModalHandler}
                        disabled={processing}>
                        Add Site
                    </PrimaryButton>
                </div>
            }>
            <Head title="Sites" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Path
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Created At
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Updated At
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sites.map((site: SiteRecord) => (
                                        <tr
                                            key={site.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {site.name}
                                            </th>
                                            <td className="px-6 py-4">{site.path}</td>
                                            <td className="px-6 py-4">
                                                {dateFormat(site.created_at).format('LLL')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {dateFormat(site.updated_at).format('LLL')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={siteEditHandler.bind(null, site)}
                                                        className="btn btn-outline-success">
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => sshModalHandler(site)}
                                                        className="btn btn-primary">
                                                        SSH Terminal
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModal} onClose={toggleModalHandler}>
                <form onSubmit={addSiteRecordAction} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Add Site</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Add a new site record to your account. This will allow you to manage DNS
                        records for the site. DNS records are used to map domain names to IP
                        addresses.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="site-name" value="Site Name" />

                        <TextInput
                            id="site-name"
                            type="text"
                            name="site-name"
                            ref={nameInput}
                            value={form.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Site Name"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="site-path" value="Directory Path" />

                        <TextInput
                            id="site-path"
                            type="text"
                            name="site-path"
                            value={form.path}
                            onChange={(e) => setData('path', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Directory Path"
                        />

                        <InputError message={errors.path} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={toggleModalHandler}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save Site
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <SSHPrompt
                isOpen={isSshModal}
                action={sshModalHandler}
                maxWidth="lg"
                kickStartCommand={kickStartCommand}
            />
        </AuthenticatedLayout>
    );
};

