const bcrypt = require('bcryptjs');
const taskServices = require('../services/taskServices')
const userToken = require('../utils/userToken')

exports.createTaskController = async (req, res) => {
    try {
        const reqBody = { ...req.body }
        const userId = req?.user?.id
        if (!userId)
            return res.status(401).send({ message: `User id is mandatory` }).end()
        await taskServices.createTaskServices(reqBody, userId)
        return res.status(201).send({ message: `Task Created Successfully` }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}

exports.getTaskByIdController = async (req, res) => {
    try {
        const id = req?.params?.id
        const userId = req?.user?.id
        if (!userId)
            return res.status(401).send({ message: `User id is mandatory` }).end()
        const response = await taskServices.getTaskByIdServices(userId, id)
        if (!response.length) {
            return res.status(404).send({ message: `Task not found` }).end()
        }
        return res.status(200).send({ data: response }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}

exports.updateTaskByIdController = async (req, res) => {
    try {
        const reqBody = { ...req.body }
        const id = req?.params?.id
        const userId = req?.user?.id
        if (!userId)
            return res.status(401).send({ message: `User id is mandatory` }).end()

        const response = await taskServices.updateTaskByIdServices(reqBody, userId, id)
        if (!response) {
            return res.status(404).send({ message: 'Task not found or no changes made' });
        }
        return res.status(200).send({ message: `Task Updated Successfully` }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}

exports.deleteTaskByIdController = async (req, res) => {
    try {
        const id = req?.params?.id
        const userId = req?.user?.id
        if (!userId)
            return res.status(401).send({ message: `User id is mandatory` }).end()
       const response = await taskServices.deleteTaskByIdServices(userId, id)
        if (!response) {
            return res.status(404).send({ message: 'Task not found' });
        }
        return res.status(200).send({ message: `Task Deleted Successfully` }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}

exports.getAllTaskController = async (req, res) => {
    try {
        const userId = req?.user?.id
        if (!userId)
            return res.status(401).send({ message: `User id is mandatory` }).end()
        // Get pagination from query params: /tasks?page=2&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const validStatuses = ['pending', 'in-progress', 'completed'];
        const statusFilter = req.query.status;
        const status = validStatuses.includes(statusFilter) ? statusFilter : null;

        const response = await taskServices.getAllTaskServices(userId, limit, offset, status);
        if (!response.length) {
            return res.status(404).send({ message: `Task not found` }).end()
        }
        return res.status(200).send({
            page, limit, data: response
        });
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}
