'use client';
import React from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const TaskCard = ({ task, onTaskDelete, onTaskEdit, onTaskStatusChange }) => {
    
    const handleDeleteTask = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${task._id}`);
            onTaskDelete(task._id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditTask = () => {
        // Pass task to the editing form
        onTaskEdit(task);
    };

    const handleStatusChange = async () => {
        try {
            const updatedTask = {
                ...task,
                status: task.status === 'Pending' ? 'Completed' : 'Pending',
            };
            await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${task._id}`, updatedTask);
            onTaskStatusChange(updatedTask);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="task-card">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <p className="task-dates"><strong>Start date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
            <p className="task-dates"><strong>Due date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="task-status"><strong>Status:</strong> {task.status}</p>
            <div className="task-actions">
                <FaCheckCircle 
                    className={`task-action-icon complete-icon ${task.status === 'Completed' ? 'completed' : ''}`}
                    onClick={handleStatusChange}
                />
                <FaEdit className="task-action-icon edit-icon" onClick={handleEditTask} />
                <FaTrashAlt className="task-action-icon delete-icon" onClick={handleDeleteTask} />
            </div>
        </div>
    );
};

export default TaskCard;
