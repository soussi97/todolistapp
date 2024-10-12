'use client';
import React from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';


const TaskCard = ({ task }) => {
    return (
        <div className="task-card">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <p className="task-dates"><strong>Start date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
            <p className="task-dates"><strong>Due date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="task-actions">
                <FaCheckCircle className="task-action-icon complete-icon" />
                <FaEdit className="task-action-icon edit-icon" />
                <FaTrashAlt className="task-action-icon delete-icon" />
            </div>
        </div>
    );
};

export default TaskCard;
