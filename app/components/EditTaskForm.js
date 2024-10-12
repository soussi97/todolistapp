'use client';
import React, { useState } from 'react';
import axios from 'axios';

const EditTaskForm = ({ task, onUpdateTask, onClose }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(new Date(task.dueDate).toISOString().substring(0, 10)); // YYYY-MM-DD format

    const handleUpdateTask = async () => {
        const updatedTask = {
            ...task,
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
        };

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${task._id}`, updatedTask);
            if (response.status === 200) {
                onUpdateTask(response.data);
                onClose(); // Close the popup after a successful update
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <>
            <div className="edit-task-form-overlay" onClick={onClose}></div>
            <div className="edit-task-form-container">
                <h3>Edit Task</h3>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                />
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                />
                <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <div className="edit-task-form-buttons">
                    <button className="save-button" onClick={handleUpdateTask}>Save Changes</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default EditTaskForm;
