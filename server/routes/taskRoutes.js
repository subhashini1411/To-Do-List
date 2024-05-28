const express = require('express');
const router = express.Router();
const validate=require('../middleware/validate')
const { getTotalTasks,createTask,updateTask,deleteTask}=require('../controller/taskController');
router.route('/',validate).get(getTotalTasks);
router.route('/create').post(createTask);
router.route('/update/:id').put(updateTask);
router.route('/delete').delete(deleteTask);
module.exports=router;