import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../main';
import Cookies from 'js-cookie';

const Permission = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  // const userToken = Cookies.get('token');
  const userToken = localStorage.getItem('token');

  // console.log("token", userToken)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${server}/users/all`, {
          headers: {
            // Authorization: `Bearer ${document.cookie.replace('token=', '')}`,
            Authorization: `Bearer ${userToken}`,
          },
        });
        // console.log(res.data);
        setUsers(res.data.users);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchUsers();
  }, []);

  const onSelectUser = (user) => {
    setSelectedUser(user);
    setPermissions(user.permissions);
  };

  const onChangePermission = (index, key, value) => {
    const newPermissions = [...permissions];
    newPermissions[index][key] = value;
    setPermissions(newPermissions);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${server}/users/permissions/${selectedUser._id}`, { permissions }, {
        headers: {
          // Authorization: `Bearer ${document.cookie.replace('token=', '')}`,
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Permission Manager</h2>
      <div>
        <label>Select User:</label>
        <select onChange={(e) => onSelectUser(users.find(user => user._id === e.target.value))}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <form onSubmit={onSubmit}>
          <h3>Edit Permissions for {selectedUser.name}</h3>
          {permissions.map((permission, index) => (
            <div key={index}>
              <h4 contenteditable="true" className='underline text-indigo-600'>{permission.link}</h4>
              <div>
                <label>View</label>
                <input
                  type="checkbox"
                  checked={permission.view}
                  onChange={(e) => onChangePermission(index, 'view', e.target.checked)}
                />
              </div>
              <div>
                <label>Add</label>
                <input
                  type="checkbox"
                  checked={permission.add}
                  onChange={(e) => onChangePermission(index, 'add', e.target.checked)}
                />
              </div>
              <div>
                <label>Edit</label>
                <input
                  type="checkbox"
                  checked={permission.edit}
                  onChange={(e) => onChangePermission(index, 'edit', e.target.checked)}
                />
              </div>
              <div>
                <label>Delete</label>
                <input
                  type="checkbox"
                  checked={permission.delete}
                  onChange={(e) => onChangePermission(index, 'delete', e.target.checked)}
                />
              </div>
              <div>
                <label>Upload</label>
                <input
                  type="checkbox"
                  checked={permission.upload}
                  onChange={(e) => onChangePermission(index, 'upload', e.target.checked)}
                />
              </div>
              <div>
                <label>Download</label>
                <input
                  type="checkbox"
                  checked={permission.download}
                  onChange={(e) => onChangePermission(index, 'download', e.target.checked)}
                />
              </div>
            </div>
          ))}
          <button className=' justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type="submit">Update Permissions</button>
        </form>
      )}
    </div>
  );
};

export default Permission;
