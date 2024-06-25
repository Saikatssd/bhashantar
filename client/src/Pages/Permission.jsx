import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {server} from '../main';

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [permissionForm, setPermissionForm] = useState({
    links: '',
    view: false,
    add: false,
    edit: false,
    delete: false,
    upload: false,
    download: false,
  });

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

  const handleRoleChange = async (e) => {
    const roleName = e.target.value;
    setSelectedRole(roleName);

    try {
      const response = await axios.get(`${server}/users/getPermission?role_name=${roleName}`);
      const permission = response.data.permission;

      if (permission) {
        setPermissionForm({
          links: permission.links.join(', '),
          view: permission.view,
          add: permission.add,
          edit: permission.edit,
          delete: permission.delete,
          upload: permission.upload,
          download: permission.download,
        });
      } else {
        setPermissionForm({
          links: '',
          view: false,
          add: false,
          edit: false,
          delete: false,
          upload: false,
          download: false,
        });
      }
    } catch (error) {
      console.error('Error fetching permission:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPermissionForm({
      ...permissionForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { links, ...rest } = permissionForm;

    try {
      await axios.put(`${server}/users/permission`, {
        role_name: selectedRole,
        links: links.split(',').map((link) => link.trim()),
        ...rest,
      });
      alert('Permission updated successfully');
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Permission Management</h2>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">Select Role</label>
        <select
          className="border p-2 w-full"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role._id} value={role.role_name}>
              {role.role_name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Links (comma separated)</label>
          <input
            type="text"
            name="links"
            className="border p-2 w-full"
            value={permissionForm.links}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">View</label>
          <input
            type="checkbox"
            name="view"
            checked={permissionForm.view}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Add</label>
          <input
            type="checkbox"
            name="add"
            checked={permissionForm.add}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Edit</label>
          <input
            type="checkbox"
            name="edit"
            checked={permissionForm.edit}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Delete</label>
          <input
            type="checkbox"
            name="delete"
            checked={permissionForm.delete}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Upload</label>
          <input
            type="checkbox"
            name="upload"
            checked={permissionForm.upload}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Download</label>
          <input
            type="checkbox"
            name="download"
            checked={permissionForm.download}
            onChange={handleFormChange}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Permission
        </button>
      </form>
    </div>
  );
};

export default PermissionManagement;
