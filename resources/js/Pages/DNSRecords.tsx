import { Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DNSRecord, PageProps, SiteRecord } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { FormEventHandler, useRef, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { dateFormat } from '@/utils';

type Props = PageProps & {
    zones: any[];
};

export default ({ auth, zones }: Props) => {
    console.log(`[zones]`, zones);

    const [records, setRecords] = useState<DNSRecord[]>([]);

    const [addSiteRecord, setAddSiteRecord] = useState(false);
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data: form,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        name: '',
        path: ''
    });

    const zoneChangeHandler = async (e: any) => {
        const zoneId = e.target.value;

        try {
            if (!zoneId) {
                return;
            }
            const response = await window.axios.get(route('dns.records', zoneId));
            setRecords(response.data.result || ([] as DNSRecord[]));
        } catch (error) {
            console.error(error);
        }
    };

    const storeRecordAction: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('dns.store'), {
            preserveScroll: true,
            onSuccess: () => toggleModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset()
        });
    };

    const toggleModal = () => {
        setAddSiteRecord((prev) => !prev);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        DNS Records
                    </h2>
                    <PrimaryButton className="ms-4" onClick={toggleModal} disabled={processing}>
                        Add Record
                    </PrimaryButton>
                </div>
            }>
            <Head title="DNS Records" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="relative px-6 py-3 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
                                <div>
                                    <form className="w-auto min-w-64 mx-auto">
                                        <label
                                            htmlFor="countries"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Select an option
                                        </label>
                                        <select
                                            id="countries"
                                            onChange={zoneChangeHandler}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option defaultChecked>Choose a zone</option>
                                            {zones.map((zone) => (
                                                <option key={zone.id} value={zone.id}>
                                                    {zone.name}
                                                </option>
                                            ))}
                                        </select>
                                    </form>
                                </div>
                                <label htmlFor="table-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="table-search"
                                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search for items"
                                    />
                                </div>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Content
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
                                                Modified At
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
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="h-[calc(100vh-370px)] overflow-y-auto">
                                    {records.map((dns: DNSRecord) => (
                                        <tr
                                            key={dns.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {dns.name}
                                            </th>
                                            <td className="px-6 py-4">{dns.type}</td>
                                            <td className="px-6 py-4">{dns.content}</td>
                                            <td className="px-6 py-4">
                                                {dateFormat(dns.created_on).format('LLL')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {dateFormat(dns.modified_on).format('LLL')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={addSiteRecord} onClose={toggleModal}>
                <form onSubmit={storeRecordAction} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Add Site Record</h2>

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
                        <InputLabel htmlFor="site-path" value="Site URL" />

                        <TextInput
                            id="site-path"
                            type="text"
                            name="site-path"
                            value={form.path}
                            onChange={(e) => setData('path', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Site Name"
                        />

                        <InputError message={errors.path} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={toggleModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save Site
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

