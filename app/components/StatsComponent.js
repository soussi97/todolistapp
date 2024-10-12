'use client';
import React from 'react';

const StatsComponent = ({ completed, pending, total }) => {
    return (
        <div className="stats-container">
            <div className="stat-box completed">
                <label>COMPLETED TASKS</label>
                <h3>0{completed}</h3>
            </div>
            <div className="stat-box pending">
                <label>PENDING TASKS</label>
                <h3>{pending}</h3>
            </div>
            <div className="stat-box total">
                <label style={{ color: '#0693E3' }}>TASKS CREATED</label>
                <h3>{total}</h3>
            </div>
        </div>
    );
};

export default StatsComponent;
