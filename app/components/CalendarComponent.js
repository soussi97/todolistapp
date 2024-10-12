'use client';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, onDateChange }) => {
    return (
        <div className="calendar-container">
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                className="rounded shadow-sm"
            />
        </div>
    );
};

export default CalendarComponent;
