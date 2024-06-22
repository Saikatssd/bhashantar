const mongoose = require('mongoose');
const Role = require('./models/Role');
const Permission = require('./models/Permission');

async function initializeDefaults() {
  const defaultPermissions = [
    { link: 'users', view: true, add: true, edit: true, delete: true, upload: true, download: true }, // Example permissions
    // Add other permissions as necessary
  ];

  const permissions = await Permission.insertMany(defaultPermissions);

  const roles = [
    { role_name: 'superAdmin', permissions: permissions.map(p => p._id), isDefault: true },
    { role_name: 'admin', permissions: permissions.map(p => p._id), isDefault: true },
    { role_name: 'user', permissions: [], isDefault: true }, // User permissions can be added as needed
  ];

  await Role.insertMany(roles);
}

initializeDefaults().then(() => {
  console.log('Default roles and permissions initialized');
  mongoose.connection.close();
}).catch(err => {
  console.error(err);
  mongoose.connection.close();
});
