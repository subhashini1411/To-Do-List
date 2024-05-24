const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add name"],
  },
  email:{
    type:String, 
    required:[true],
  },
  password:{
    type:String,
    required:[true],
  }
} 
);

module.exports = mongoose.model("User", UserSchema);