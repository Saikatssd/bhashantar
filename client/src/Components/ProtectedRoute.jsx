// // // import React from 'react';
// // // import { useSelector, Outlet } from 'react-redux';

// // // const ProtectedRoutes = ({ roles }) => {
// // //   const user = useSelector((state) => state.auth.user);
// // //   const isAuthenticated = user && user.isAuthenticated; 
// // //   const hasRequiredRole = roles.some((role) => user && user.role === role); 

// // //   return isAuthenticated && hasRequiredRole ? <Outlet /> : <div>Unauthorized</div>;
// // // };

// // // export default ProtectedRoutes;




// // // import { useSelector } from 'react-redux'
// // import { Link, Outlet } from 'react-router-dom'

// // const ProtectedRoute = ({isAuthenticated}) => {
// //   // const { isAuthenticated} = useSelector((state) => state.auth)

// //   // show unauthorized screen if no user is found in redux store
// //   if (!isAuthenticated) {
// //     return (
// //       <div className='unauthorized'>
// //         <h1>Unauthorized :(</h1>
// //         <span>
// //           <Link to='/'>Login</Link> to gain access
// //         </span>
// //       </div>
// //     )
// //   }

// //   return <Outlet />
// // }

// // export default ProtectedRoute




// import React from 'react';
// import { Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ component: Component, requiredPermission}) => {
//   const { user } = useSelector(state => state.auth);

//   return (
//     <Route

//       render={props =>
//         user && user.permissions.some(permission => permission.link === requiredPermission && permission.view) ? (
//           <Component {...props} />
//         ) : (
//           // <Redirect to="/unauthorized" />
//           <h1>Unauthorized</h1>
//           //or message
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ role, children }) => {
  const { user } = useSelector(state => state.auth);
  console.log("role in protected route", role)
  const hasRequiredRole = user.role === 'superAdmin' || user?.role === role;

  if (!hasRequiredRole) {
    return <Navigate to='/home' replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;


