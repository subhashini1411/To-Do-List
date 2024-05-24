const Tasks=require('../models/taskModel');
const getTotalTasks=async(req,res)=>{
   
     try {
      const tasks = await Tasks.find();
      // Send tasks as a response
      return res.status(200).json({ tasks });     }
       catch (error) {
      console.error('Error ', error)
    res.status(500).json({ error: 'Internal Server Error' })
     }
};
const createTask = async (req, res) => {
  try {
    const {Task}  = req.body;
    console.log(req.body);

    if (!Task) {
      res.status(400).json({ 
        message: "task is required" });
      return
    }
    const newtask = await Tasks.create({ Task });
    return res.status(201).json({
      data: newtask,
    })
  } catch (error) {
    console.error('Error creating task:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
};
const updateTask = async (req, res) => {
  try {
    const { Task } = req.body
    const currentTask = await Tasks.findOneAndUpdate(
      { _id: req.params.id },{
        $set: {
          Task: Task,
        },
      }
    )
    return res
      .status(200)
      .json({ message: `update task` })
  } catch (error) {
    console.error('Error in updating  task:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Tasks.findOneAndDelete({ _id: req.params.id })
    return res
      .status(200)
      .json({ message: `deleted task` })
  } catch (error) {
    console.error('Error in deleting task:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports={getTotalTasks,createTask,updateTask,deleteTask};