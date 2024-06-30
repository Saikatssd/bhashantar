// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './assets/font.css';
// import App from './App.jsx'
// import AppBar from './AppBar.jsx'
// import './index.css'
// import Hero from './Hero.jsx'
// import Login from './Pages/Login.jsx'
// import Workspace from './Pages/Workspace.jsx'
// import Choose from './Pages/Choose.jsx'
// import { Provider } from 'react-redux';
// import store from './store/store.jsx';

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import AuthInitializer from './Components/AuthIntializer.jsx';

// export const server = "http://localhost:5566";

// const NotFound = () => <div className='text-2xl flex min-h-screen justify-center items-center'>Page Not Found</div>;

// const router = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <Hero/>,
//   // },
//   {
//     path: "/",
//     element: <Login />,
//   },

//   {
//     path: "choose",
//     element: <Choose />,
//   },
//   {
//     path: "workspace",
//     element: <Workspace />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <div className="bg-hero relative isolate px-6 pt-14 lg:px-8">
//       <div
//         className="  absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         aria-hidden="true"
//       >
//         <div
//           className=" relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>
//       <Provider store={store}>
//         <AuthInitializer>
//           <AppBar />
//           <RouterProvider router={router} />
//         </AuthInitializer>
//       </Provider>
//       <div
//         className="absolute  inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         aria-hidden="true"
//       >
//         <div
//           className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>
//     </div>
//   </React.StrictMode>
// )






import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import AuthInitializer from './Components/AuthIntializer.jsx'

export const server = "http://localhost:5566";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="bg-hero relative isolate px-6 pt-2 lg:px-8">
      <div
        className="  absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className=" relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <Provider store={store}>
        {/* <AuthInitializer> */}
          <App />
        {/* </AuthInitializer> */}
      </Provider>
      <div
        className="absolute  inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  </React.StrictMode>
);
