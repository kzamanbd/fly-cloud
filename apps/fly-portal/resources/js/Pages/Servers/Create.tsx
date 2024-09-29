import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Servers Create
                </h2>
            }>
            <Head title="Servers Create" />

            <div className="px-3">
                <div className="max-w-7xl mx-auto py-10 px-3 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl font-semibold mb-5 dark:text-gray-300">
                            Create Server
                        </h3>
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded">
                            <div className="px-4 py-5 sm:p-6 dark:border-gray-700">
                                <div className="flex flex-wrap justify-between sm:flex-nowrap space-x-4">
                                    <div>
                                        <svg
                                            width="59"
                                            height="60"
                                            viewBox="0 0 59 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-14 w-14 text-indigo-600 dark:text-indigo-400">
                                            <path
                                                d="M43.0271 22.8056L29.9604 43.5936C29.2523 44.9392 27.2739 44.6143 27.0154 43.1098L25.7992 36.4136C25.5542 35.0634 25.6969 33.6699 26.21 32.4002C26.7231 31.1306 27.5849 30.0387 28.692 29.2557C28.8032 29.1752 28.8821 29.0564 28.9141 28.9213C28.9461 28.7861 28.9292 28.6438 28.8663 28.5204C28.8035 28.397 28.699 28.3009 28.5721 28.2498C28.4452 28.1987 28.3044 28.1961 28.1757 28.2424C26.8969 28.7192 25.508 28.7993 24.1845 28.4728C22.8609 28.1462 21.6619 27.4275 20.7388 26.4075L17.6496 22.9956C16.7172 21.9648 17.4343 20.2969 18.8109 20.2969H41.6794C42.9443 20.2969 43.7082 21.7206 43.0271 22.8056ZM14.7298 36.6844C14.5045 36.6844 14.2811 36.6752 14.0586 36.6624C14.996 34.8844 16.389 33.3986 18.0893 32.363C19.7896 31.3274 21.7336 30.7808 23.7145 30.7813C23.9397 30.7813 24.164 30.7905 24.3865 30.8052C23.4488 32.583 22.0556 34.0686 20.3552 35.1041C18.6548 36.1395 16.7107 36.685 14.7298 36.6844ZM29.2794 0C13.1099 0 0 13.3556 0 29.8322C0 46.3088 13.1099 59.6644 29.2794 59.6644C45.4506 59.6644 58.5587 46.3088 58.5587 29.8322C58.5587 13.3556 45.4506 0 29.2794 0Z"
                                                fill="#6A6AFF"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                                            Provision through FlyWP
                                        </h3>
                                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Don’t want to signup with providers like DigitalOcean,
                                            Vultr, etc.? We got you covered. We have partnered with
                                            them so you don’t have to. (FlyWP subscription required)
                                            Add your credit card to get started.
                                        </div>
                                        <div className="flex-shrink-0 pt-2">
                                            <button
                                                className="font-semibold focus:outline-none bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-md px-4 py-2 text-sm inline-flex"
                                                type="button">
                                                Get Started
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    data-slot="icon"
                                                    className="h-5 w-5 ml-2 text-white">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-7 mb-3 font-semibold dark:text-gray-300">
                            Or, connect your own
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:md:grid-cols-none md:grid lg:flex space-x-1 md:space-x-3 lg:space-x-3 gap-2 md:gap-2 lg:gap-0 mb-4">
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=do">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="Layer_1"
                                            x="0"
                                            y="0"
                                            version="1.1"
                                            viewBox="65.2 173.5 180 180"
                                            fill="#0080FF">
                                            <defs></defs>
                                            <g id="XMLID_229_">
                                                <g id="XMLID_690_">
                                                    <g id="XMLID_691_">
                                                        <g id="XMLID_44_">
                                                            <g id="XMLID_48_">
                                                                <path
                                                                    id="XMLID_49_"
                                                                    d="M155.2 351.7v-34.2c36.2 0 64.3-35.9 50.4-74-5.1-14.1-16.4-25.4-30.5-30.5-38.1-13.8-74 14.2-74 50.4H67c0-57.7 55.8-102.7 116.3-83.8 26.4 8.3 47.5 29.3 55.7 55.7 18.9 60.6-26 116.4-83.8 116.4z"></path>
                                                            </g>
                                                            <path
                                                                id="XMLID_47_"
                                                                d="M155.3 317.6h-34v-34h34z"></path>
                                                            <path
                                                                id="XMLID_46_"
                                                                d="M121.3 343.8H95.1v-26.2h26.2z"></path>
                                                            <path
                                                                id="XMLID_45_"
                                                                d="M95.1 317.6H73.2v-21.9h21.9v21.9z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        DigitalOcean
                                    </h4>
                                </div>
                            </a>
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=vultr">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 256 221">
                                            <path
                                                fill="#C9F4FF"
                                                d="M89.173 6.095A12.739 12.739 0 0 0 78.385 0H12.8C5.73 0 0 5.73 0 12.8c0 2.413.676 4.778 1.95 6.827l16.884 24.807 84.419-18.285-14.08-20.054Z"></path>
                                            <path
                                                fill="#51B9FF"
                                                d="M103.619 26.636a12.86 12.86 0 0 0-10.85-6.095H27.43a12.74 12.74 0 0 0-11.216 19.748l18.835 29.867 87.222-13.653-18.651-29.867Z"></path>
                                            <path
                                                fill="#007BFC"
                                                d="M34.255 68.937a13.044 13.044 0 0 1-1.158-11.459c1.96-5 6.82-8.258 12.19-8.168h65.342a12.8 12.8 0 0 1 10.849 6.096l58.697 93.074a12.922 12.922 0 0 1 1.951 6.827 13.106 13.106 0 0 1-1.951 6.826l-32.792 51.993a12.862 12.862 0 0 1-21.699 0L34.255 68.937Zm165.303 29.745a12.861 12.861 0 0 0 21.699 0l11.276-17.86L254.05 46.69a12.929 12.929 0 0 0 1.95-6.826 13.117 13.117 0 0 0-1.95-6.827l-17.067-26.94A12.863 12.863 0 0 0 226.133 0h-65.584a12.799 12.799 0 0 0-12.801 12.8 12.192 12.192 0 0 0 2.012 6.827l49.798 79.055Z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        Vultr
                                    </h4>
                                </div>
                            </a>
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=aws">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 -30 150 150">
                                            <path
                                                fill="#F90"
                                                d="M122.714 62.703c5.28-.643 16.924-2.027 18.997.643 2.072 2.621-2.319 13.649-4.293 18.544-.592 1.484.691 2.077 2.023.94 8.684-7.319 10.954-22.6 9.178-24.825-1.777-2.175-17.023-4.055-26.3 2.473-1.431 1.038-1.184 2.423.395 2.225z"></path>
                                            <path
                                                fill="#F90"
                                                d="M74.852 89.456c20.28 0 43.865-6.38 60.099-18.396 2.664-1.978.345-4.994-2.369-3.758-18.207 7.714-37.993 11.473-56.003 11.473-26.694 0-52.5-7.368-73.42-19.533-1.827-1.088-3.208.791-1.679 2.176 19.343 17.505 44.951 28.038 73.372 28.038z"></path>
                                            <path
                                                className="fill-[#252F3E] dark:fill-gray-100"
                                                d="M42.632 32.835c0 1.83.197 3.313.542 4.401a26.505 26.505 0 0 0 1.58 3.56c.246.396.345.792.345 1.138 0 .495-.296.99-.938 1.484l-3.108 2.077c-.444.296-.889.445-1.283.445-.494 0-.987-.248-1.48-.693a15.29 15.29 0 0 1-1.777-2.324 38.28 38.28 0 0 1-1.53-2.918c-3.848 4.55-8.684 6.825-14.506 6.825-4.145 0-7.45-1.187-9.868-3.56-2.418-2.374-3.652-5.54-3.652-9.495 0-4.204 1.48-7.616 4.49-10.187 3.01-2.572 7.007-3.857 12.09-3.857 1.677 0 3.404.148 5.23.395 1.825.248 3.7.643 5.674 1.088v-3.61c0-3.758-.79-6.379-2.32-7.912-1.578-1.533-4.243-2.274-8.042-2.274-1.727 0-3.503.197-5.329.642a39.247 39.247 0 0 0-5.329 1.682 14.14 14.14 0 0 1-1.727.643c-.345.098-.592.148-.79.148-.69 0-1.036-.494-1.036-1.533V6.577c0-.791.1-1.385.346-1.73.246-.347.69-.693 1.381-1.04 1.727-.89 3.8-1.631 6.217-2.225C20.23.94 22.797.642 25.51.642c5.872 0 10.164 1.336 12.927 4.006 2.714 2.67 4.096 6.726 4.096 12.165v16.022h.099zm-20.033 7.517c1.628 0 3.306-.297 5.082-.89 1.776-.594 3.355-1.682 4.687-3.165.79-.94 1.382-1.978 1.678-3.165.296-1.187.493-2.621.493-4.302v-2.077a41.135 41.135 0 0 0-4.539-.84 37.099 37.099 0 0 0-4.638-.298c-3.306 0-5.724.643-7.352 1.978-1.628 1.336-2.418 3.215-2.418 5.687 0 2.324.592 4.055 1.826 5.242 1.184 1.236 2.911 1.83 5.18 1.83zm39.621 5.34c-.888 0-1.48-.148-1.875-.494-.394-.297-.74-.99-1.036-1.929L47.714 5.044c-.296-.99-.444-1.632-.444-1.978 0-.791.394-1.236 1.184-1.236h4.835c.938 0 1.58.148 1.925.494.395.297.69.99.987 1.929l8.29 32.736 7.697-32.736c.246-.99.542-1.632.937-1.929.395-.297 1.085-.494 1.974-.494h3.947c.938 0 1.579.148 1.974.494.395.297.74.99.937 1.929l7.796 33.132L98.29 4.253c.295-.99.64-1.632.986-1.929.395-.297 1.036-.494 1.925-.494h4.588c.79 0 1.234.395 1.234 1.236 0 .247-.049.494-.099.791a7.041 7.041 0 0 1-.345 1.236L94.688 43.32c-.297.989-.642 1.631-1.037 1.928-.394.297-1.036.495-1.875.495h-4.243c-.938 0-1.58-.149-1.974-.495-.394-.346-.74-.989-.937-1.978l-7.648-31.895-7.599 31.846c-.247.989-.543 1.632-.938 1.978-.394.346-1.085.494-1.973.494H62.22zm63.405 1.336c-2.566 0-5.132-.297-7.599-.89-2.467-.594-4.391-1.237-5.674-1.979-.79-.445-1.332-.94-1.53-1.384a3.503 3.503 0 0 1-.296-1.385v-2.522c0-1.038.395-1.533 1.135-1.533.296 0 .592.05.888.148.296.1.74.297 1.234.495a26.791 26.791 0 0 0 5.428 1.73c1.973.396 3.898.594 5.871.594 3.109 0 5.527-.544 7.204-1.632 1.678-1.088 2.566-2.67 2.566-4.698 0-1.384-.444-2.521-1.332-3.461-.888-.94-2.566-1.78-4.984-2.571l-7.154-2.226c-3.602-1.137-6.267-2.818-7.895-5.044-1.628-2.176-2.467-4.599-2.467-7.17 0-2.077.444-3.907 1.332-5.489.888-1.582 2.072-2.967 3.553-4.055 1.48-1.137 3.157-1.978 5.131-2.571 1.974-.594 4.046-.841 6.217-.841 1.086 0 2.221.05 3.306.198 1.135.148 2.171.346 3.207.544.987.247 1.925.494 2.813.79.888.298 1.579.594 2.072.891.691.396 1.185.791 1.481 1.236.296.396.444.94.444 1.632V8.16c0 1.039-.395 1.583-1.135 1.583-.395 0-1.036-.198-1.875-.594-2.813-1.285-5.971-1.928-9.474-1.928-2.812 0-5.033.445-6.562 1.384-1.53.94-2.319 2.374-2.319 4.402 0 1.384.493 2.57 1.48 3.51s2.812 1.88 5.427 2.72l7.007 2.226c3.553 1.137 6.118 2.72 7.648 4.747 1.53 2.027 2.27 4.351 2.27 6.923 0 2.126-.444 4.055-1.283 5.736-.888 1.681-2.072 3.165-3.602 4.352-1.53 1.236-3.355 2.126-5.477 2.769-2.22.692-4.54 1.039-7.056 1.039z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        AWS
                                    </h4>
                                </div>
                            </a>
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=akamai">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 40 40">
                                            <path
                                                fill="#009BDE"
                                                d="M21.606 38.85c-8.123-2.48-14.05-9.988-14.05-18.867 0-8.996 6.045-16.576 14.31-18.96.85-.237.613-.804-.402-.804-10.98 0-19.906 8.855-19.906 19.764 0 10.91 8.902 19.74 19.906 19.74 1.015 0 1.063-.59.142-.873Z"></path>
                                            <path
                                                fill="#009BDE"
                                                d="M11.334 24.588a17.787 17.787 0 0 1-.094-1.606c0-8.665 7.013-15.678 15.679-15.678 8.193 0 10.649 3.66 10.956 3.423.33-.26-2.975-7.508-12.586-7.508-8.666 0-15.679 7.013-15.679 15.678 0 2.008.378 3.92 1.063 5.668.283.755.732.755.661.023Z"></path>
                                            <path
                                                fill="#009BDE"
                                                d="M17.898 13.301c4.062-1.77 9.186-1.818 14.215-.07 3.377 1.18 5.337 2.856 5.502 2.786.26-.119-1.96-3.66-5.998-5.172a14.355 14.355 0 0 0-13.955 2.125c-.425.331-.26.544.236.331Z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        Akamai
                                    </h4>
                                </div>
                            </a>
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=hetzner">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 180 180"
                                            className="rounded">
                                            <path
                                                d="M0 90v90h90 90V90 0H90 0v90zm55.4-58.4c1.4 1.3 1.6 4.9 1.6 24V78h33 33V56c0-27.3-.7-26 14.2-26 8 0 10.5.3 12 1.7 1.7 1.5 1.8 4.7 1.8 58.4 0 50.3-.2 56.9-1.6 58.3-1.2 1.3-3.8 1.6-12.1 1.6-15.2 0-14.3 1.7-14.3-25.7V102H90 57v22.4c0 19.1-.2 22.7-1.6 24-2.3 2.3-22.5 2.3-24.8 0-1.4-1.4-1.6-8-1.6-58.4s.2-57 1.6-58.4C31.8 30.3 34.5 30 43 30s11.2.3 12.4 1.6z"
                                                fill="#d50c2d"></path>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        Hetzner
                                    </h4>
                                </div>
                            </a>
                            <a
                                className="relative flex cursor-pointer justify-center md:justify-normal lg:justify-normal text-center rounded-lg border-2 p-4 bg-white dark:bg-gray-700 focus:outline-none border-gray-200 dark:border-gray-600 hover:bg-gray-50"
                                href="/servers/create?provider=custom">
                                <div className="w-24 flex flex-col items-center justify-between gap-5 p-3">
                                    <div className="w-16">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="text-indigo-500">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="block text-xs font-medium text-gray-900 dark:text-gray-300">
                                        Custom
                                    </h4>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

