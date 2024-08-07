import { Head, useForm } from '@inertiajs/react';
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
import Button from '@/Components/Button';
import { CiLogin, CiEdit } from 'react-icons/ci';
import { IoTerminal, IoAdd } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import TextAreaInput from '@/Components/TextAreaInput';
import { Tooltip } from 'react-tooltip';

type Props = PageProps & {
    sites: SiteRecord[];
};

export default ({ auth, sites }: Props) => {
    const nameInput = useRef<HTMLInputElement>(null);
    const [siteId, setSiteId] = useState<string | null>(null);

    const {
        data: form,
        setData,
        post,
        put,
        reset,
        errors,
        processing
    } = useForm({
        name: '',
        ip_address: '',
        port: '22',
        username: 'root',
        domain: '',
        path: '',
        privateKey: ''
    });

    const siteRecordAction: FormEventHandler = (e) => {
        e.preventDefault();

        if (siteId) {
            put(route('sites.update', siteId), {
                preserveScroll: true,
                onSuccess: () => setIsModal(false),
                onError: () => nameInput.current?.focus(),
                onFinish: () => reset()
            });

            return;
        }

        post(route('sites.store'), {
            preserveScroll: true,
            onSuccess: () => setIsModal(false),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset()
        });
    };

    const handlePrivateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            setData('privateKey', event.target?.result as string);
        };

        reader.onerror = function (event) {
            console.error('Error reading file:', event.target?.error);
        };

        reader.readAsText(file);
    };

    const [isModal, setIsModal] = useState(false);
    const modalClose = () => {
        setIsModal(false);
        reset();
    };

    const siteEditHandler = (site: SiteRecord) => {
        setSiteId(site.uuid);

        // update form data with site data to edit
        setData((prevData) => ({
            ...prevData,
            name: site.name,
            ip_address: site.ip_address,
            port: site.port,
            username: site.username,
            domain: site.domain,
            path: site.path
        }));
        setIsModal(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Sites</h2>
                    <Button className="ms-4" onClick={() => setIsModal(true)} disabled={processing}>
                        <IoAdd className="size-5" />
                        Add Site
                    </Button>
                </div>
            }>
            <Head title="Sites" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm overflow-hidden rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Host
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Directory
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Updated At
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
                                        <td className="px-6 py-4">{site.ip_address}</td>
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
                                                    data-tooltip-id="edit-action"
                                                    onClick={siteEditHandler.bind(null, site)}>
                                                    <CiEdit className="size-5" />
                                                </button>

                                                <a
                                                    href={route('wp.login', {
                                                        redirect: site.domain
                                                    })}
                                                    data-tooltip-id="wp-login"
                                                    target="_blank">
                                                    <CiLogin className="size-5" />
                                                </a>

                                                <a
                                                    href={route('ssh', { uuid: site.uuid })}
                                                    data-tooltip-id="ssh-connect"
                                                    target="_blank">
                                                    <IoTerminal className="size-5" />
                                                </a>
                                                <HiDotsVertical
                                                    data-tooltip-id="site-actions"
                                                    className="size-5 cursor-pointer"
                                                />
                                            </div>
                                            <Tooltip id="site-actions" content="Site Actions" />
                                            <Tooltip
                                                id="wp-login"
                                                content="Login to WordPress Admin"
                                            />
                                            <Tooltip
                                                id="ssh-connect"
                                                content="Connect to SSH Terminal"
                                            />
                                            <Tooltip id="edit-action" content="Edit Site" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal title="Add Site" show={isModal} onClose={modalClose} maxWidth="xl">
                <form onSubmit={siteRecordAction}>
                    <div>
                        <InputLabel htmlFor="site-name" value="Name" />

                        <TextInput
                            id="site-name"
                            type="text"
                            ref={nameInput}
                            value={form.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Name"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-2">
                            <InputLabel htmlFor="ssh-host" value="Host" />

                            <TextInput
                                id="ssh-host"
                                type="text"
                                value={form.ip_address}
                                className="mt-1 block w-full"
                                autoComplete="ssh-host"
                                placeholder="13.214.214.72"
                                onChange={(e) => setData('ip_address', e.target.value)}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="ssh-port" value="Port" />

                            <TextInput
                                id="ssh-port"
                                type="text"
                                value={form.port}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('port', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-2">
                            <InputLabel htmlFor="path" value="Directory" />

                            <TextInput
                                id="path"
                                type="text"
                                value={form.path}
                                onChange={(e) => setData('path', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="/var/www/html"
                                required
                            />

                            <InputError message={errors.path} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="username" value="Username" />

                            <TextInput
                                id="username"
                                type="text"
                                value={form.username}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('username', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="domain" value="Domain" />

                        <TextInput
                            id="domain"
                            type="text"
                            value={form.domain}
                            onChange={(e) => setData('domain', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="https://"
                            required
                        />

                        <InputError message={errors.domain} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="privateKey" value="Private Key" />

                        <TextAreaInput
                            id="privateKey"
                            value={form.privateKey}
                            onChange={(e) => setData('privateKey', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD..."
                        />

                        <InputError message={errors.privateKey} className="mt-2" />
                    </div>

                    <div className="text-center w-full my-2">or</div>
                    <div>
                        <label htmlFor="small-file-input" className="sr-only">
                            Choose file
                        </label>
                        <input
                            type="file"
                            name="small-file-input"
                            id="small-file-input"
                            onChange={handlePrivateKey}
                            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={modalClose}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save & Close
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

