import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SuperAdminHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {/* <div className={`flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-full z-10`}>
                <div className="px-4 py-6">
                    <ul className="mt-6 space-y-1">
                        <li>
                            <a href="#" className="block rounded-lg bg-[#e3d2fa] px-4 py-2 text-sm font-medium text-gray-700">
                                General
                            </a>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                    <span className="text-sm font-medium"> Teams </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                            Banned Users
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                            Calendar
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                Billing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                Invoices
                            </a>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                    <span className="text-sm font-medium"> Account </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Details
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Security
                                        </a>
                                    </li>
                                    <li>
                                        <form action="#">
                                            <button type="submit" className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
                                                Logout
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
              
            </div> */}

            {/* Main Content */}
            <div className="flex-grow p-6 ml-64 flex items-center ">

                <Link to='/adminHome' className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Proof Reading</h2>
                </Link>

                <Link to='' className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Legal Vetting</h2>
                </Link>
            </div>
        </div>
    );
};

export default SuperAdminHome;
