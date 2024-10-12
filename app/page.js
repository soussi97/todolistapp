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

export default function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Set the initial selected date on the client-side to avoid hydration errors
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    // Fetch tasks from backend when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks`);
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
            const response = await axios.post(`http://localhost:5000/api/tasks`, newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Function to handle date change from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="container mt-4">
            <Header />
            <div className="row mt-5">
                <div className="col-md-4 mb-4">
                    {/* Calendar component to select due date */}
                    <CalendarComponent selectedDate={selectedDate} onDateChange={handleDateChange} />
                </div>
                <div className="col-md-8">
                    {/* Task Form uses the selected date from CalendarComponent */}
                    <TaskForm onAddTask={addTask} selectedDate={selectedDate} />
                    <TaskControls />
                    <div className="task-list">
                        {tasks.map((task, index) => (
                            <TaskCard key={task._id || index} task={task} />
                        ))}
                    </div>
                    <StatsComponent
                        completed={tasks.filter(task => task.status === 'Completed').length}
                        pending={tasks.filter(task => task.status === 'Pending').length}
                        total={tasks.length}
                    />
                </div>
            </div>
            <Footer className="mt-5" />
        </div>
    );
}
