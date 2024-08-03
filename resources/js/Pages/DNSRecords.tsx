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

    const [isModal, setIsModal] = useState(false);
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data: form,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        name: '*.draftscripts.com',
        type: 'CNAME',
        content: '76.76.21.61',
        proxy_status: false,
        ttl: 'Auto'
    });

    const [zoneId, setZoneId] = useState('4994921dd63598ee59c59abefe48e205');

    const types = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'SRV', 'PTR', 'CAA'];

    const ttls = ['1 minute', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour'];

    const zoneChangeHandler = async (e: any) => {
        const zoneId = e.target.value;
        setZoneId(zoneId);
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

        post(route('dns.store', zoneId), {
            preserveScroll: true,
            onSuccess: () => toggleModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset()
        });
    };

    const toggleModal = () => {
        setIsModal((prev) => !prev);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            DNS Records
                        </h2>
                        <p>Manage DNS records of your domain.</p>
                    </div>
                    <PrimaryButton onClick={toggleModal} disabled={processing}>
                        Add Record
                    </PrimaryButton>
                </div>
            }>
            <Head title="DNS Records" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {isModal && (
                                <form onSubmit={storeRecordAction} className="space-y-5 px-6 py-3">
                                    <p className="mt-1 text-sm text-gray-600">
                                        [name] points to [IPv4 address] and has its traffic proxied
                                        through Cloudflare.
                                    </p>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
                                        <div>
                                            <label htmlFor="name">Type</label>
                                            <select
                                                className="form-select"
                                                onChange={(e) => {
                                                    setData('type', e.target.value);
                                                }}
                                                required>
                                                <option defaultChecked>Type</option>
                                                {types.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                placeholder="Enter name"
                                                className="form-input"
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="content">Content</label>
                                            <div className="flex">
                                                <input
                                                    id="content"
                                                    placeholder="Content"
                                                    onChange={(e) =>
                                                        setData('content', e.target.value)
                                                    }
                                                    className="form-input"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-around items-center">
                                            <label htmlFor="proxy_status">Proxy Status</label>
                                            <label className="relative h-6 w-12 m-0">
                                                <input
                                                    onChange={(e) => {
                                                        setData('proxy_status', e.target.checked);
                                                    }}
                                                    type="checkbox"
                                                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                    id="custom_switch_checkbox2"
                                                />
                                                <span className="outline_checkbox bg-icon dark:border-white-dark dark:before:bg-white-dark block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url('/images/close.svg')] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url('/images/checked.svg')]"></span>
                                            </label>
                                            Proxied
                                        </div>
                                        <div>
                                            <label>TTL</label>
                                            <div className="flex">
                                                <select
                                                    disabled={!form.proxy_status}
                                                    className="form-select rounded-r-none"
                                                    onChange={(e) => {
                                                        setData('ttl', e.target.value);
                                                    }}>
                                                    <option defaultChecked defaultValue="Auto">
                                                        Auto
                                                    </option>
                                                    {ttls.map((ttl) => (
                                                        <option key={ttl} value={ttl}>
                                                            {ttl}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    type="submit"
                                                    className="flex items-center justify-center rounded-r-md border border-l-0 border-[#e0e6ed] bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    {processing ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24px"
                                                            height="24px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-white-dark h-5 w-5 animate-spin">
                                                            <line
                                                                x1="12"
                                                                y1="2"
                                                                x2="12"
                                                                y2="6"></line>
                                                            <line
                                                                x1="12"
                                                                y1="18"
                                                                x2="12"
                                                                y2="22"></line>
                                                            <line
                                                                x1="4.93"
                                                                y1="4.93"
                                                                x2="7.76"
                                                                y2="7.76"></line>
                                                            <line
                                                                x1="16.24"
                                                                y1="16.24"
                                                                x2="19.07"
                                                                y2="19.07"></line>
                                                            <line
                                                                x1="2"
                                                                y1="12"
                                                                x2="6"
                                                                y2="12"></line>
                                                            <line
                                                                x1="18"
                                                                y1="12"
                                                                x2="22"
                                                                y2="12"></line>
                                                            <line
                                                                x1="4.93"
                                                                y1="19.07"
                                                                x2="7.76"
                                                                y2="16.24"></line>
                                                            <line
                                                                x1="16.24"
                                                                y1="7.76"
                                                                x2="19.07"
                                                                y2="4.93"></line>
                                                        </svg>
                                                    ) : (
                                                        'Add'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}

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
                                            className="form-select">
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
        </AuthenticatedLayout>
    );
};

