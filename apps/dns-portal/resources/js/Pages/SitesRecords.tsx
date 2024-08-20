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
import AppLayout from '@/Layouts/AppLayout';

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
                </div>
            }>
            <Head title="Sites" />

            <AppLayout
                title="Sites"
                actions={
                    <button
                        onClick={() => setIsModal(true)}
                        disabled={processing}
                        className="font-semibold focus:outline-none bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-md px-4 py-2 text-sm inline-flex"
                        type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="-ml-1 mr-2 h-5 w-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"></path>
                        </svg>
                        Create New Site
                    </button>
                }>
                <table className="min-w-full divide-y dark:border-gray-800 divide-gray-200 dark:divide-gray-900">
                    <thead className="bg-gray-50 dark:bg-gray-800 dark:">
                        <tr>
                            <th
                                className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                scope="col">
                                Site
                            </th>
                            <th
                                className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                scope="col">
                                Status
                            </th>
                            <th
                                className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                scope="col">
                                PHP Version
                            </th>
                            <th
                                className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                scope="col">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-900">
                        {sites.map((site: SiteRecord) => (
                            <tr key={site.id} className="w-full">
                                <td className="px-3 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-4 w-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                data-slot="icon"
                                                className="text-green-500"
                                                data-state="closed">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-2">
                                            <a
                                                target="_blank"
                                                className="text-sm font-bold text-indigo-500"
                                                href={`http://${site.ip_address}`}>
                                                {site.ip_address}
                                            </a>
                                        </div>
                                        <div className="h-4 w-4 ml-2">
                                            <a
                                                className="text-indigo-400"
                                                href="http://querulous-bicycle-attain.flywp.xyz"
                                                target="_blank"
                                                title="Preview Site"
                                                data-state="closed">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    data-slot="icon">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-sm whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200">
                                        Active
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-sm dark:text-gray-300 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                            className="h-5 w-5">
                                            <circle cx="10" cy="10" r="10" fill="#4F46E5"></circle>
                                            <path
                                                fill="#fff"
                                                d="M2.986 7.595h2.471c.726.006 1.251.215 1.577.627.326.412.434.974.323 1.688a3.238 3.238 0 0 1-.286.959 2.853 2.853 0 0 1-.59.848c-.307.32-.636.523-.987.61-.35.085-.713.128-1.088.128H3.299l-.35 1.752H1.667l1.319-6.612Zm1.079 1.051-.554 2.767c.037.006.074.01.11.01h.13c.59.005 1.082-.053 1.476-.176.393-.13.658-.578.793-1.347.11-.645 0-1.017-.332-1.116-.326-.098-.735-.144-1.227-.138-.074.006-.144.01-.212.01h-.194l.01-.01Zm4.753-2.813h1.272l-.36 1.762h1.144c.627.012 1.095.141 1.402.387.314.246.406.713.277 1.402l-.618 3.071h-1.291l.59-2.933c.061-.307.043-.525-.055-.654-.099-.13-.31-.194-.637-.194l-1.024-.01-.756 3.791H7.49l1.329-6.622Zm5.102 1.762h2.471c.726.006 1.252.215 1.578.627.325.412.433.974.322 1.688a3.238 3.238 0 0 1-.286.959 2.852 2.852 0 0 1-.59.848c-.307.32-.636.523-.987.61-.35.085-.713.128-1.088.128h-1.107l-.35 1.752H12.6l1.319-6.612Zm1.079 1.051-.554 2.767c.037.006.074.01.111.01h.13c.59.005 1.081-.053 1.475-.176.393-.13.658-.578.793-1.347.11-.645 0-1.017-.332-1.116-.326-.098-.735-.144-1.227-.138-.073.006-.144.01-.212.01h-.194l.01-.01Z"></path>
                                        </svg>
                                        8.2
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-sm whitespace-nowrap">
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
                                    <Tooltip id="site-actions" content="Actions" />
                                    <Tooltip id="wp-login" content="Login to WordPress Admin" />
                                    <Tooltip id="ssh-connect" content="Connect to SSH Terminal" />
                                    <Tooltip id="edit-action" content="Edit Site" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AppLayout>

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

