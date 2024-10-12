'use client';
import React from 'react';

const TaskControls = () => {
    return (
        <div className="task-controls d-flex justify-content-between align-items-center mb-4">
            <div>
                <button className="btn btn-outline-secondary mx-1">By Category</button>
                <button className="btn btn-outline-secondary mx-1">By Priority</button>
            </div>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control w-50 mx-2"
                    placeholder="Search by name"
                />
                <button className="btn-add-task">
                    <strong>+</strong>
                </button>
            </div>
        </div>
    );
};

export default TaskControls;
