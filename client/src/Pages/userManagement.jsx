import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from "../main"

const UserManagement = ({ companyId }) => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: '', isActive: true });

    

    useEffect(() => {
        fetchUsersAndAdmins();
    }, []);

    const fetchUsersAndAdmins = async () => {
        try {
            const response = await axios.get(`${server}/users/${companyId}/users`);
            setUsers(response.data.users);
            setAdmins(response.data.admin);
        } catch (error) {
            console.error('Error fetching users and admins:', error);
        }
    };

    const updateUser = async () => {
        try {
            await axios.put(`${server}/users/updateUser`, { userId: selectedUser._id, ...userForm });
            fetchUsersAndAdmins();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${server}/users/deleteUser`, { data: { userId } });
            fetchUsersAndAdmins();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setUserForm({ name: user.name, email: user.email, password: '', role: user.role.role_name, isActive: user.isActive });
    };

    const handleFormChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6  min-h-screen">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>

            <h3 className="text-xl font-semibold mb-4">Admins</h3>
            <table className="min-w-full bg-white border mb-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td className="border px-4 py-2">{admin.name}</td>
                            <td className="border px-4 py-2">{admin.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-yellow-500 text-white p-2 mr-2"
                                    onClick={() => handleEditClick(admin)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2"
                                    onClick={() => deleteUser(admin._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <table className="min-w-full bg-white border mb-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role.role_name}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-yellow-500 text-white p-2 mr-2"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div className="mt-6 p-6 bg-white border rounded">
                    <h3 className="text-xl font-semibold mb-4">Edit User</h3>
                    <input
                        type="text"
                        name="name"
                        className="border p-2 mb-4 w-full"
                        placeholder="Name"
                        value={userForm.name}
                        onChange={handleFormChange}
                    />
                    <input
                        type="email"
                        name="email"
                        className="border p-2 mb-4 w-full"
                        placeholder="Email"
                        value={userForm.email}
                        onChange={handleFormChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="border p-2 mb-4 w-full"
                        placeholder="Password"
                        value={userForm.password}
                        onChange={handleFormChange}
                    />
                    <select
                        name="role"
                        className="border p-2 mb-4 w-full"
                        value={userForm.role}
                        onChange={handleFormChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <label className="block mb-4">
                        <input
                            type="checkbox"
                            name="isActive"
                            className="mr-2"
                            checked={userForm.isActive}
                            onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })}
                        />
                        Active
                    </label>
                    <button className="bg-green-500 text-white p-2" onClick={updateUser}>
                        Update User
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
