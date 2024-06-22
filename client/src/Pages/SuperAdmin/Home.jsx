// import React from 'react'

// export default function Home() {
//     return (
//         <div>
//             <div className="flex h-screen">
//                 {/* Sidebar */}
//                 <div className="bg-gray-800 text-white w-16 flex flex-col items-center py-4">
//                     <div className="mb-4 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
//                         <span>1</span>
//                     </div>

//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-grow p-6 flex flex-col items-center justify-center">
//                     <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
//                         <h2 className="text-2xl font-semibold">Kyrotics</h2>
//                     </div>
//                     <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
//                         <h2 className="text-2xl font-semibold">Client</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



import React, { useState } from 'react';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar Toggle Button */}
            <div className="flex flex-col items-center py-4">
                <button
                    className="mb-4 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"
                    onClick={toggleSidebar}
                >
                    <span>=</span>
                </button>
               
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="bg-gray-800 text-white w-64 flex flex-col items-center py-4">
                    <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                    <div className="mb-4 w-56 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span>Client 1</span>
                    </div>
                    <div className="mb-4 w-56 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span>Client 2</span>
                    </div>
                    <div className="w-56 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span>Add client +</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-grow p-6 flex  items-center justify-center">
                <div className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Kyrotics</h2>
                </div>
                <div className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Client</h2>
                </div>
            </div>
        </div>
    );
};

export default Home;
