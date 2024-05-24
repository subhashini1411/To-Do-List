const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  Task: {
    type: String,
    required: [true, "please add task"],
  },
} 
);

module.exports = mongoose.model("Tasks", taskSchema);