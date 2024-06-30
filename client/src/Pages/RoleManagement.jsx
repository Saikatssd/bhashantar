// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {server} from "../main"
// const RoleManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState('');
//   const [isAllowedToDelete, setIsAllowedToDelete] = useState(true);
//   const [selectedRole, setSelectedRole] = useState(null);

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get(`${server}/users/getRoles`);
//       setRoles(response.data.roles);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
//   };

//   const createRole = async () => {
//     try {
//       const response = await axios.post(`'${server}/users/createRole`, { role_name: newRole, isAllowedToDelete });
//       setRoles([...roles, response.data.role]);
//       setNewRole('');
//       setIsAllowedToDelete(true);
//     } catch (error) {
//       console.error("Error creating role:", error);
//     }
//   };

//   const deleteRole = async (roleId) => {
//     try {
//       await axios.delete(`${server}/users/deleteRole/${roleId}`);
//       setRoles(roles.filter(role => role._id !== roleId));
//     } catch (error) {
//       console.error("Error deleting role:", error);
//     }
//   };

//   const updateRole = async () => {
//     try {
//       const response = await axios.put(`${server}/users/updateRole/${selectedRole._id}`, { role_name: selectedRole.role_name, isAllowedToDelete: selectedRole.isAllowedToDelete });
//       const updatedRoles = roles.map(role => role._id === selectedRole._id ? response.data.role : role);
//       setRoles(updatedRoles);
//       setSelectedRole(null);
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Role Management</h2>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="border p-2 mr-2"
//           placeholder="New Role Name"
//           value={newRole}
//           onChange={(e) => setNewRole(e.target.value)}
//         />
//         <label className="mr-2">
//           <input
//             type="checkbox"
//             checked={isAllowedToDelete}
//             onChange={(e) => setIsAllowedToDelete(e.target.checked)}
//           />
//           Allowed to Delete
//         </label>
//         <button className="bg-blue-500 text-white p-2" onClick={createRole}>
//           Add Role
//         </button>
//       </div>

//       <h3 className="text-xl font-semibold mb-2">Existing Roles</h3>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Role Name</th>
//             <th className="border px-4 py-2">Allowed to Delete</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role._id}>
//               <td className="border px-4 py-2">{role.role_name}</td>
//               <td className="border px-4 py-2">{role.isAllowedToDelete ? 'Yes' : 'No'}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-yellow-500 text-white p-2 mr-2"
//                   onClick={() => setSelectedRole(role)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white p-2"
//                   onClick={() => deleteRole(role._id)}
//                   disabled={!role.isAllowedToDelete}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedRole && (
//         <div className="mt-4 p-4 border rounded">
//           <h3 className="text-xl font-semibold mb-2">Edit Role</h3>
//           <input
//             type="text"
//             className="border p-2 mr-2"
//             value={selectedRole.role_name}
//             onChange={(e) => setSelectedRole({ ...selectedRole, role_name: e.target.value })}
//           />
//           <label className="mr-2">
//             <input
//               type="checkbox"
//               checked={selectedRole.isAllowedToDelete}
//               onChange={(e) => setSelectedRole({ ...selectedRole, isAllowedToDelete: e.target.checked })}
//             />
//             Allowed to Delete
//           </label>
//           <button className="bg-green-500 text-white p-2" onClick={updateRole}>
//             Update Role
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleManagement;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from "../main"

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [isAllowedToDelete, setIsAllowedToDelete] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${server}/users/getRoles`);
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const createRole = async () => {
    try {
      const response = await axios.post(`${server}/users/createRole`, { role_name: newRole, isAllowedToDelete });
      setRoles([...roles, response.data.role]);
      setNewRole('');
      setIsAllowedToDelete(true);
    } catch (error) {
      console.log('Error creating role:', error);
      console.error('Error creating role:', error);
    }
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.post(`${server}/users/deleteRole`, { roleId });
      fetchRoles();
      // setRoles(roles.filter(role => role.role_name !== role_name));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const updateRole = async (roleId) => {
    try {
      const response = await axios.put(`${server}/users/updateRole/${roleId}`,{role_name:selectedRole.role_name,isAllowedToDelete});
      const updatedRoles = roles.map(role => role._id === selectedRole._id ? response.data.role : role);
      setRoles(updatedRoles);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
    
  };

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Role Management</h2>
      <div className="mb-6">
        <input
          type="text"
          className="border p-2 mr-4"
          placeholder="New Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <label className="mr-4">
          <input
            type="checkbox"
            checked={isAllowedToDelete}
            onChange={(e) => setIsAllowedToDelete(e.target.checked)}
          />
          Allowed to Delete
        </label>
        <button className="bg-blue-500 text-white p-2" onClick={createRole}>
          Add Role
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Existing Roles</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Role Name</th>
            <th className="border px-4 py-2">Allowed to Delete</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td className="border px-4 py-2">{role.role_name}</td>
              <td className="border px-4 py-2">{role.isAllowedToDelete ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white p-2 mr-2"
                  onClick={() => setSelectedRole(role)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2"
                  onClick={() => deleteRole(role._id)}
                  disabled={!role.isAllowedToDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
      selectedRole && (
        <div className="mt-6 p-6 bg-white border rounded">
          <h3 className="text-xl font-semibold mb-4">Edit Role</h3>
          <input
            type="text"
            className="border p-2 mr-4"
            value={selectedRole.role_name}
            onChange={(e) => setSelectedRole({ ...selectedRole, role_name: e.target.value })}
          />
          <label className="mr-4">
            <input
              type="checkbox"
              checked={selectedRole.isAllowedToDelete}
              onChange={(e) => setSelectedRole({ ...selectedRole, isAllowedToDelete: e.target.checked })}
            />
            Allowed to Delete
          </label>
          <button className="bg-green-500 text-white p-2" onClick={() => {updateRole(selectedRole._id);}}>
            Update Role
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
