'use client';
import React from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';


const TaskCard = ({ task, onTaskDelete, onTaskEdit, onTaskStatusChange }) => {
    const handleDelete = () => {
        onTaskDelete(task._id);
    };

    const handleEdit = () => {
        onTaskEdit(task);
    };

    const handleStatusChange = () => {
        const updatedTask = {
            ...task,
            status: task.status === 'Pending' ? 'Completed' : 'Pending',
        };
        onTaskStatusChange(updatedTask);
    };

    return (
        <div className="task-card">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <p className="task-dates">
                <strong>Start date:</strong> {new Date(task.startDate).toLocaleDateString()}
            </p>
            <p className="task-dates">
                <strong>Due date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <div className="task-actions">
                <FaCheckCircle className="task-action-icon complete-icon" onClick={handleStatusChange} />
                <FaEdit className="task-action-icon edit-icon" onClick={handleEdit} />
                <FaTrashAlt className="task-action-icon delete-icon" onClick={handleDelete} />
            </div>
        </div>
    );
};

export default TaskCard;
