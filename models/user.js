
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
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);