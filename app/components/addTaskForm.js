'use client';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const TaskForm = ({ onAddTask, selectedDate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async () => {
        if (!title || !description) {
            alert("Title and description are required.");
            return;
        }

        const newTask = {
            title,
            description,
            startDate: new Date().toISOString(), // Set start date to current date
            dueDate: selectedDate ? selectedDate.toISOString() : new Date().toISOString(), // Set due date from selected date
            status: 'Pending', // Update status to be 'Pending' consistently
        };

        try {
            // Make an API call to add the task to the backend
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, newTask); // Use environment variable
            if (response.status === 201) {
                // If the response is successful, add the task to the state
                onAddTask(response.data);
                // Clear input fields
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="task-form d-flex align-items-center my-4" style={{ gap: '1rem' }}>
            {/* Task Title Input */}
            <input
                type="text"
                className="form-control"
                placeholder="Type Title Of Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ borderRadius: '10px', padding: '0.5rem', width: '100%' }}
            />

            {/* Task Details Input */}
            <input
                type="text"
                className="form-control"
                placeholder="Detail Of Your Task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ borderRadius: '10px', padding: '0.5rem', width: '100%' }}
            />

            {/* Add Task Button */}
            <button
                className="btn-add-task mt-3"
                onClick={handleAddTask}
                style={{
                    backgroundColor: '#8AA381',
                    borderRadius: '50%',
                    color: 'white',
                    fontSize: '2rem',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                }}
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default TaskForm;
