import React from 'react'
import { Link } from "react-router-dom";

export default function Choose() {

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 p-4">
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">High Court</h2>
                        <p className="text-gray-700">Description of Criminal Case.</p>
                    </div>
                </Link>
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Supreme Court</h2>
                        <p className="text-gray-700">Description of Divorce Case.</p>
                    </div>
                </Link>
                <Link to="/workspace">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Other</h2>
                        <p className="text-gray-700">Description of Other Cases.</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
