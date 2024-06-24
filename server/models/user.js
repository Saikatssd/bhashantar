const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   // role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now() },
// });
// const userModel = mongoose.model("User", userSchema);
// module.exports = userModel;





// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin', 'superadmin'], required: true },
// });
// const userModel = mongoose.model("User", userSchema);
// module.exports = userModel;






// const mongoose = require('mongoose');

// // Define permission schema as a subdocument
// const PermissionSchema = new mongoose.Schema({
//   link: { type: String, required: true },
//   view: { type: Boolean, default: false },
//   add: { type: Boolean, default: false },
//   edit: { type: Boolean, default: false },
//   delete: { type: Boolean, default: false },
//   upload: { type: Boolean, default: false },
//   download: { type: Boolean, default: false }
// });

// const UserSchema = new mongoose.Schema({
//   role: { type: String, enum: ['user', 'admin', 'superadmin'], required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updated_ts: { type: Date, default: Date.now },
//   permissions: [PermissionSchema],
//   isActive: { type: Boolean, default: true }, // User account status (active/disabled)
//   isAllowedToDelete: { type: Boolean, default: false } // Flag for deletion by authorized admins
// });

// // Pre-save middleware for stricter access control
// UserSchema.pre('save', function (next) {
//   const user = this;

//   // Only allow superadmins to set isAllowedToDelete
//   if (user.isModified('isAllowedToDelete') && user.role !== 'superadmin') {
//     return next(new Error('Only superadmins can set isAllowedToDelete flag'));
//   }

//   // Only allow superadmins to grant delete permission in any permission object
//   // user.permissions.forEach(permission => {
//   //   if (permission.isModified('delete') && user.role !== 'superadmin') {
//   //     return next(new Error('Only superadmins can grant delete permission'));
//   //   }
//   // });

//   next();
// });

// module.exports = mongoose.model('User', UserSchema);




// const ClientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Client', ClientSchema);



// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['superadmin', 'admin', 'user'], required: true },
//   clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false } // Only for admins and users
// });

// module.exports = mongoose.model('User', UserSchema);


// const TaskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   status: { type: String, enum: ['ready for work', 'work in progress', 'complete'], required: true },
//   clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
//   completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
// });

// module.exports = mongoose.model('Task', TaskSchema);



// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'user'], required: true },
//   clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false }, // Removed
//   isActive: { type: Boolean, default: true }, // User account status (active/disabled)
//   isAllowedToDelete: { type: Boolean, default: false } // Flag for deletion by authorized admins
// });


// const ClientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   superAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });





