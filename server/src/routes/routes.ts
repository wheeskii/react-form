import express, { request } from "express";
import Task from "../models/Task";
import { where } from "sequelize";

const router = express.Router();

router.get('/form', async (req: any, res: any) => {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
});

router.get('/form/:taskName', async(req: any, res: any) => {
    const task = await Task.findOne({
        where: {
            taskName: req.params.taskName
        }
    });
    res.status(200).json(task);
})

router.post('/form', async (req: any, res: any) => {
    const { taskName, content } = req.body;
    
    if(!taskName || !content) {
        return res.status(400).json({ message: "Missing fields." });
    }
    
    const newTask = Task.build({
        'taskName': taskName,
        'content': content
    });

    await newTask.save();
    res.status(201).json(newTask);

    // submittedForms.push({ name, email})
    
    return res.status(200).json({ 
        message: 'Form received', 
        data: { taskName, content }
    });
    
});

router.patch('/todo/:taskName', async (req, res) => {
    
    const { taskName } = req.params;
    const updates = req.body;

    const task = await Task.findOne({ where: { taskName } });

    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
    }
    
    await task.update(updates);

    res.status(200).json(task);
    
});

router.put('/todo/:taskName', async (req, res) => {

    const { taskName } = req.params;
    const { taskName: newTaskName, content, is_complete } = req.body;

// Validate input
//   if (!newTaskName || content === undefined || is_complete === undefined) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

    // Find task by current name
    const task = await Task.findOne({ where: { taskName } });

    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
    }

    await task.update({ taskName: newTaskName, content, is_complete });

    res.status(200).json(task);
   
});



// UPDATE FULL
// router.put('/todo/:taskName', async (req, res) => {
//     const task = await Task.findOne({
//         where: {
//             taskname:req.params.taskName
//         }
//     });
//     const { is_complete, content, description } = req.body;

//     task.set({
//         is_complete: is_complete,
//         content: content,
//         taskName: taskName
//     });

//     await task.save();
//     res.status(200).json(task);
// });

export default router