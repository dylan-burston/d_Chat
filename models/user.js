const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    profilePic: { type: String, default: "/images/profile-pic.png"},
    caption: {type: String, default: "New to DChat", maxLength: 50},
    age: {type: String, default: "", maxLength: 2},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],   
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);