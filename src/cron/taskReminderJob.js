const cron = require('node-cron');
const taskService = require('../services/taskServices');
const userService = require('../services/usersServices');
const { sendReminderEmail } = require('../utils/nodemailer');

cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await taskService.getTasksDueBetween(now, oneHourLater);

    for (const task of tasks) {
        if (!task.reminderSent && !task.completed) {
            const user = await userService.getUserById(task.userId);
            if (user) {
                sendReminderEmail(user, task);
                await taskService.markReminderSent(task.userId, task.id);
            }
        }
    }

    console.log('🔔 Reminder job executed');
});
