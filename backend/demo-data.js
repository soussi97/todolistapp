//demodata
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Demo data
const tasks = [
  {
    title: 'Learn JavaScript',
    description: 'Master the language powering the modern web.',
    startDate: '2023-07-07',
    dueDate: '2023-07-10',
    status: 'Pending',
  },
  {
    title: 'Finish Backend',
    description: 'Complete all backend endpoints and connect with frontend.',
    startDate: '2023-10-01',
    dueDate: '2023-10-05',
    status: 'Completed',
  },
  {
    title: 'Design Calendar UI',
    description: 'Create an improved calendar component with week numbers.',
    startDate: '2023-09-15',
    dueDate: '2023-09-20',
    status: 'Pending',
  },
];

// Import Demo Data
const importData = async () => {
  try {
    // Clear existing data if any
    await Task.deleteMany();

    // Insert demo tasks
    await Task.insertMany(tasks);

    console.log('Demo data successfully imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing demo data: ', error);
    process.exit(1);
  }
};

importData();
