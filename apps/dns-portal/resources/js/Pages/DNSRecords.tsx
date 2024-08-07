import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DNSRecord, PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { dateFormat } from '@/utils';
import { toast } from 'react-toastify';
import InputError from '@/Components/InputError';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import Button from '@/Components/Button';
import { IoAdd } from 'react-icons/io5';
import { VscLoading } from 'react-icons/vsc';

type Props = PageProps & {
    zones: any[];
};

export default ({ auth, zones }: Props) => {
    const [records, setRecords] = useState<DNSRecord[]>([]);

    const [isModal, setIsModal] = useState(false);

    const {
        data: form,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        name: '',
        type: '',
        content: '',
        proxied: true,
        ttl: 1
    });

    const [recordId, setRecordId] = useState(0);
    const [recordIsLoading, setRecordIsLoading] = useState(true);
    const params = new URLSearchParams(window.location.search);

    const [zoneId, setZoneId] = useState(params.get('zoneId') || '');

    if (zones?.length && !zoneId) {
        setZoneId(zones[0]?.id);
    }
    const types = ['A', 'AAAA', 'CNAME', 'TXT'];

    const timeToLive = [
        { value: '1', label: 'Auto' },
        { value: '120', label: '2 minutes' },
        { value: '300', label: '5 minutes' },
        { value: '600', label: '10 minutes' },
        { value: '900', label: '15 minutes' },
        { value: '1800', label: '30 minutes' },
        { value: '3600', label: '1 hour' }
    ];

    const fetchRecords = async () => {
        try {
            if (!zoneId) {
                toast.error('Zone ID is required.');
                return;
            }
            setRecordIsLoading(true);
            const response = await window.axios.get(route('dns.records', zoneId));
            setRecords(response.data.result || ([] as DNSRecord[]));
        } catch (error) {
            console.error(error);
        } finally {
            setRecordIsLoading(false);
        }
    };

    useEffect(() => {
        if (zoneId) {
            fetchRecords();
        }
    }, [zoneId]);

    const storeRecordAction: FormEventHandler = (e) => {
        e.preventDefault();
        if (!zoneId) {
            toast.error('Zone ID is required.');
            return;
        }

        if (recordId) {
            return post(route('dns.update', [zoneId, recordId]), {
                preserveScroll: true,
                onSuccess: () => {
                    toggleModal();
                    const updatedRecords = records.map((record) => {
                        if (record.id === recordId) {
                            return {
                                ...record,
                                ...form
                            };
                        }
                        return record;
                    });
                    setRecords(updatedRecords);
                }
            });
        }

        post(route('dns.store', zoneId), {
            preserveScroll: true,
            onSuccess: () => toggleModal()
        });
    };

    const recordEditHandler = async (record: DNSRecord) => {
        setRecordId(record.id);
        setData((prev) => ({
            ...prev,
            name: record.name,
            type: record.type,
            content: record.content,
            proxied: record.proxied,
            ttl: record.ttl
        }));
        setIsModal(true);
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
                    <Button className="ms-4" onClick={toggleModal} disabled={processing}>
                        <IoAdd className="size-5" />
                        Add DNS Record
                    </Button>
                </div>
            }>
            <Head title="DNS Records" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm overflow-hidden rounded-lg">
                        {isModal && (
                            <form
                                onSubmit={storeRecordAction}
                                className="space-y-5 px-6 py-3 border-b">
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
                                            value={form.type}
                                            required>
                                            <option hidden>Type</option>
                                            {types.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.type} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="name">Name (required)</label>
                                        <input
                                            id="name"
                                            placeholder="Enter name"
                                            className="form-input"
                                            value={form.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="content">IPv4 address (required)</label>
                                        <div className="flex">
                                            <input
                                                id="content"
                                                placeholder="Content"
                                                value={form.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>

                                    <div className="flex flex-col justify-around items-center">
                                        <label htmlFor="proxied">Proxy Status</label>
                                        <div className="flex items-center gap-2">
                                            <label className="relative h-6 w-12 m-0">
                                                <input
                                                    onChange={(e) => {
                                                        setData('proxied', e.target.checked);
                                                    }}
                                                    checked={form.proxied}
                                                    type="checkbox"
                                                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                    id="custom_switch_checkbox2"
                                                />
                                                <span className="outline_checkbox bg-icon dark:border-white-dark dark:before:bg-white-dark block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before-bg-close before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked-before-bg"></span>
                                            </label>
                                            <span>{form.proxied ? 'Proxied' : 'DNS Only'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label>TTL</label>
                                        <div className="flex">
                                            <select
                                                disabled={form.proxied}
                                                className="form-select rounded-r-none"
                                                value={form.ttl}
                                                onChange={(e) => {
                                                    setData('ttl', Number(e.target.value));
                                                }}>
                                                <option hidden>Auto</option>
                                                {timeToLive.map((ttl) => (
                                                    <option key={ttl.value} value={ttl.value}>
                                                        {ttl.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex items-center justify-center rounded-r-md border border-l-0 border-[#e0e6ed] bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                {processing ? (
                                                    <VscLoading className="size-5 animate-spin" />
                                                ) : recordId ? (
                                                    'Update'
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
                                    <select
                                        onChange={(e) => setZoneId(e.target.value)}
                                        className="form-select"
                                        value={zoneId}>
                                        <option hidden>Select Zone</option>
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
                                    <CiSearch className="size-5 text-gray-400" />
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
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Modified At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            {recordIsLoading ? (
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-4" colSpan={5}>
                                            <div role="status" className="max-w-sm animate-pulse">
                                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody className="max-h-[calc(100vh-370px)] overflow-y-auto">
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
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={recordEditHandler.bind(null, dns)}>
                                                        <CiEdit className="size-5" />
                                                    </button>
                                                    <HiDotsVertical className="size-5 cursor-pointer" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

