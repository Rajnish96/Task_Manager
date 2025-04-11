const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const taskValidation = require('../validator/taskValidation')
const taskController = require('../controller/taskController')

router.post('', auth, taskValidation.validateCreateTask, taskController.createTaskController)
router.get('/:id', auth, taskValidation.validateTaskIdParam, taskController.getTaskByIdController)
router.put('/:id', auth, taskValidation.validateUpdateTask, taskController.updateTaskByIdController)
router.delete('/:id', auth, taskValidation.validateTaskIdParam, taskController.deleteTaskByIdController)
router.get('', auth, taskController.getAllTaskController)

module.exports = router