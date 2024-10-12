'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import CalendarComponent from './components/CalendarComponent';
import TaskCard from './components/TaskCard';
import TaskControls from './components/TaskControls';
import StatsComponent from './components/StatsComponent';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';
import Typewriter from 'typewriter-effect';

export default function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingTask, setEditingTask] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fetch tasks when component mounts if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            fetchTasks();
        }
    }, []);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Function to add a new task
    const addTask = async (newTask) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, newTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
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

    // Function to handle login
    const handleLogin = (token) => {
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        fetchTasks();
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <div className="container">
            <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
            {isAuthenticated ? (
                <>
                    <div className="greeting-container">
                        <Typewriter
                            options={{
                                strings: ["Hello, Aqeel, Start planning today"],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                            }}
                        />
                    </div>
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
                    </div>
                    {editingTask && (
                        <EditTaskForm
                            task={editingTask}
                            onUpdateTask={editTask}
                            onClose={handleClosePopup}
                        />
                    )}
                    <StatsComponent
                        completed={tasks.filter(task => task.status === 'Completed').length}
                        pending={tasks.filter(task => task.status === 'Pending').length}
                        total={tasks.length}
                    />
                </>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
            <Footer />
        </div>
    );
}
