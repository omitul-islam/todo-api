import Queue from 'bull';
import todoModel from '../todo/model/todoModel.js';
import nodemailer from 'nodemailer';
const reminderQueue = new Queue('reminderQueue',{
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    
});

reminderQueue.process(async (job) => {
        const {taskId, email, subject, body} = job.data;
        if(!taskId) {
            console.log("There is no task assigned with this id!");
            return;
        }
        const task = await todoModel.findById(taskId);
        if(task.isCompleted) {
            console.log("This task is already completed!");
            return;
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
              user: process.env.TASKMAILER,
              pass: process.env.TASKMAILER_PASSWORD,
            },
          });
        
        console.log("Transporter is created!");
        try {
            await transporter.sendMail({
                from: "TASK-APP",
                to: email,
                text:body
            })
          console.log("Email sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error.message);  
        }

        console.log(`Sending reminder email to ${email} with subject: ${subject} with body: ${body}`);
});

export default reminderQueue;