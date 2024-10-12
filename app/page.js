'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CalendarComponent from './components/CalendarComponent';
import TaskCard from './components/TaskCard';
import TaskControls from './components/TaskControls';
import StatsComponent from './components/StatsComponent';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';


export default function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingTask, setEditingTask] = useState(null); // State to manage the task being edited

    // Fetch tasks from backend when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Function to add a new task
    const addTask = async (newTask) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    // Function to handle edit task
    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    };

    // Function to handle status change
    const changeTaskStatus = (updatedTask) => {
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    };

    // Function to open edit popup
    const handleEditPopup = (task) => {
        setEditingTask(task);
    };

    // Function to close edit popup
    const handleClosePopup = () => {
        setEditingTask(null);
    };

    // Function to handle date change from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-md-4 mb-4">
                    {/* Calendar component to select due date */}
                    <CalendarComponent selectedDate={selectedDate} onDateChange={handleDateChange} />
                </div>
                <div className="col-md-8">
                    {/* Task Form uses the selected date from CalendarComponent */}
                    <TaskForm onAddTask={addTask} selectedDate={selectedDate} />
                    <TaskControls />
                    <div className="task-list">
                        {tasks.map((task) => (
                            <TaskCard 
                                key={task._id} 
                                task={task} 
                                onTaskDelete={deleteTask} 
                                onTaskEdit={handleEditPopup} 
                                onTaskStatusChange={changeTaskStatus} 
                            />
                        ))}
                    </div>
                   
                </div>
                <StatsComponent
                        completed={tasks.filter(task => task.status === 'Completed').length}
                        pending={tasks.filter(task => task.status === 'Pending').length}
                        total={tasks.length}
                    />

            </div>
            {editingTask && (
                <EditTaskForm 
                    task={editingTask} 
                    onUpdateTask={editTask} 
                    onClose={handleClosePopup} 
                />
            )}
            <Footer className="mt-5" />
        </div>
    );
}
