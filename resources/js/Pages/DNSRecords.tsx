import { Head, usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DNSRecord, PageProps, SiteRecord } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import { FormEventHandler, useRef, useState } from "react";

type Props = PageProps & {
    records: DNSRecord[];
    zones: any[];
};

export default ({ auth, records, zones }: Props) => {
    console.log(`[zones]`, zones);

    const [addSiteRecord, setAddSiteRecord] = useState(false);
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data: form,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: "",
        path: "",
    });

    const addSiteRecordAction: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("sites.store"), {
            preserveScroll: true,
            onSuccess: () => toggleModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset(),
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
                    <PrimaryButton
                        className="ms-4"
                        onClick={toggleModal}
                        disabled={processing}
                    >
                        Add Record
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="DNS Records" />

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
                                            <div className="flex items-center">
                                                Path
                                                <a href="#">
                                                    <svg
                                                        className="w-3 h-3 ms-1.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Created At
                                                <a href="#">
                                                    <svg
                                                        className="w-3 h-3 ms-1.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Updated At
                                                <a href="#">
                                                    <svg
                                                        className="w-3 h-3 ms-1.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((site: DNSRecord) => (
                                        <tr
                                            key={site.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {site.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {site.content}
                                            </td>
                                            <td className="px-6 py-4">
                                                {site.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {site.updated_at}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
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
                <form onSubmit={addSiteRecordAction} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Site Record
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Add a new site record to your account. This will allow
                        you to manage DNS records for the site. DNS records are
                        used to map domain names to IP addresses.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="site-name" value="Site Name" />

                        <TextInput
                            id="site-name"
                            type="text"
                            name="site-name"
                            ref={nameInput}
                            value={form.name}
                            onChange={(e) => setData("name", e.target.value)}
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
                            onChange={(e) => setData("path", e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Site Name"
                        />

                        <InputError message={errors.path} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={toggleModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save Site
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};
