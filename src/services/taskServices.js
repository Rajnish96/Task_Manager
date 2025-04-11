const knex = require('../db/config/knex')

exports.createTaskServices = async (userData, userId) => {
    const data = {
        userId: userId,
        title: userData.title,
        description: userData.description,
        status: userData.status,
        dueDate: userData.dueDate,
    }
    return await knex('tasks').insert(data)
}

exports.getTaskByIdServices = async (userId, id) => {
    return await knex('tasks').select('*').where({ userId, id })
}

exports.updateTaskByIdServices = async (userData, userId, id) => {
    const data = {
        title: userData.title,
        description: userData.description,
        status: userData.status,
        dueDate: userData.dueDate,
    }
    return await knex('tasks').update(data).where({ userId, id })
}

exports.deleteTaskByIdServices = async (userId, id) => {
    return await knex('tasks').delete().where({ userId, id })
}

exports.getAllTaskServices = async (userId, limit, offset, status) => {
    const query = knex('tasks')
        .select('*')
        .where({ userId });

    if (status) {
        query.andWhere({ status });
    }

    return await query.limit(limit).offset(offset);
};


exports.getTasksDueBetween = async (startTime, endTime) => {
    return await knex('tasks')
        .whereBetween('dueDate', [startTime, endTime])
        .andWhere('reminderSent', false)
        .andWhereNot('status', 'completed');
};

exports.markReminderSent = async (userId, taskId) => {
    return await knex('tasks')
        .where({ userId, id: taskId })
        .update({ reminderSent: true });
};