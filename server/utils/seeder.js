const mongoose = require("mongoose");
const Role = require("../models/role");
const Permission = require("../models/permission");
const connectDatabase = require("../Database/Database");
require("dotenv").config({ path: "./config.env" });

const initializeDefaults = async () => {
  const defaultPermissions = [
    {
      links: ["/register"],
      view: true,
      add: true,
      edit: true,
      delete: true,
      upload: true,
      download: true,
    },
  ];

  try {
    const existingRoles = await Role.find({
      role_name: { $in: ["superAdmin", "admin", "user"] },
    }).lean();

    if (existingRoles.length > 0) {
      console.log("Roles already initialized:", existingRoles);
      return;
    }

    console.log("Creating default roles...");

    const roles = [
      { role_name: "superAdmin", isAllowedToDelete: false, permissions: [] },
      { role_name: "admin", permissions: [], isAllowedToDelete: false },
      { role_name: "user", permissions: [], isAllowedToDelete: true },
    ];

    const createdRoles = await Role.insertMany(roles);
    console.log("Created default roles:", createdRoles);

    console.log("Creating default permissions...");

    const permissions = [];
    for (const role of createdRoles) {
      if (role.role_name === "superAdmin") {
        for (const perm of defaultPermissions) {
          const newPerm = await Permission.create({ ...perm, role: role._id });
          permissions.push(newPerm);
          role.permissions.push(newPerm._id);
        }
        await role.save();
      }
    }
    console.log("Created permissions:", permissions);
  } catch (error) {
    console.error("Error initializing defaults:", error);
    throw error;
  }
};

const runSeed = async () => {
  try {
    await connectDatabase();
    await initializeDefaults();
    console.log("Initialization completed.");
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    mongoose.connection.close();
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = initializeDefaults;
