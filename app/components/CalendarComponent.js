'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, onDateChange }) => {
    const [dayName, setDayName] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const dayOptions = { weekday: 'long' };
        const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };

        setDayName(new Intl.DateTimeFormat('en-US', dayOptions).format(selectedDate));
        setFormattedDate(new Intl.DateTimeFormat('en-US', dateOptions).format(selectedDate));
    }, [selectedDate]);

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1 className="day-name">{dayName}</h1>
                <h2 className="formatted-date">{formattedDate}</h2>
            </div>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                className="rounded"
                showWeekNumbers={true}
            />
        </div>
    );
};

export default CalendarComponent;
