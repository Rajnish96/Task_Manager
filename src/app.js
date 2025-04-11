const express = require('express')
const { PORT } = require('./config/env')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')
require('./cron/taskReminderJob');

app.use(express.json());
app.use(cors());

app.use('/healthCheck', async (_, res) => {
    return res.status(200).send('Backend is up and running').end()
})
app.use('/v1/users', userRouter)
app.use('/v1/task', taskRouter)

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`)
})