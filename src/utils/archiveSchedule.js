import Queue from 'bull';
import todoModel from '../todo/model/todoModel.js';

const archiveQueue = new Queue('archiveQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});

archiveQueue.process(async (job) => {
  const { taskId } = job.data;

  try {
    const task = await todoModel.findById(taskId);
    if (!task) {
      console.log(`Task with ID ${taskId} not found!`);
      return;
    }

    if (task.archived) {
      console.log(`Task ${taskId} is already archived.`);
      return;
    }

    task.archived = true;
    await task.save();

    console.log(`Task ${taskId} archived successfully.`);
  } catch (err) {
    console.error(`Error archiving task ${taskId}:`, err.message);
  }
});

export default archiveQueue;
