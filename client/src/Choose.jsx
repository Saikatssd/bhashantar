import React from 'react'
import { Link } from "react-router-dom";

export default function Choose() {

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3" >
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h2 className="text-xl font-bold mb-2">High Court</h2>
                        <p className="text-gray-700">Description of Criminal Case.</p>
                    </div>
                </Link>
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h2 className="text-xl font-bold mb-2">Supreme Court</h2>
                        <p className="text-gray-700">Description of Divorce Case.</p>
                    </div>
                </Link>
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h2 className="text-xl font-bold mb-2">Other</h2>
                        <p className="text-gray-700">Description of Other Cases.</p>
                    </div>
                </Link>
            </div>
        </div>

    //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
    //   <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    //     <div
    //       className="p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
    //       onClick={() => navigateToWorkspace('Criminal Case')}
    //     >
    //       <div className="flex items-center mb-4">
    //         <FaGavel className="text-blue-500 text-3xl mr-3" />
    //         <h2 className="text-2xl font-bold text-gray-800">Criminal Case</h2>
    //       </div>
    //       <p className="text-gray-600">Details and proceedings of criminal cases.</p>
    //     </div>
    //     <div
    //       className="p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
    //       onClick={() => navigateToWorkspace('Divorce')}
    //     >
    //       <div className="flex items-center mb-4">
    //         <FaHeartBroken className="text-red-500 text-3xl mr-3" />
    //         <h2 className="text-2xl font-bold text-gray-800">Divorce</h2>
    //       </div>
    //       <p className="text-gray-600">Legal processes and documentation for divorce cases.</p>
    //     </div>
    //     <div
    //       className="p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
    //       onClick={() => navigateToWorkspace('Other')}
    //     >
    //       <div className="flex items-center mb-4">
    //         <FaFolderOpen className="text-green-500 text-3xl mr-3" />
    //         <h2 className="text-2xl font-bold text-gray-800">Other</h2>
    //       </div>
    //       <p className="text-gray-600">Various other legal matters and case types.</p>
    //     </div>
    //   </div>
    // </div>
    )
}
