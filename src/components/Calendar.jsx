import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

function Calendar() {
  const events = [
    { title: 'Meeting', date: '2023-06-03', color: '#ff9f89' },
    { title: 'Conference', date: '2023-06-05', color: '#1d9bf0' },
    { title: 'Workshop', date: '2023-06-10', color: '#3a87ad' },
    // Add more events here
  ];

  const calendarStyles = {
    container: {
      maxWidth: '1100px',
      margin: '40px auto',
      padding: '0 10px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    toolbar: {
      background: '#f4f4f4',
      borderBottom: '1px solid #ddd',
      borderRadius: '8px 8px 0 0',
      padding: '10px',
    },
    toolbarTitle: {
      fontSize: '1.5em',
      color: '#333',
    },
    button: {
      background: '#1d9bf0',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      padding: '5px 10px',
      margin: '0 5px',
    },
    buttonHover: {
      background: '#155a8a',
    },
    event: {
      border: 'none',
      borderRadius: '4px',
      padding: '2px 5px',
    },
    eventHover: {
      background: '#ff9f89',
      color: 'white',
    },
    dayNumber: {
      color: '#1d9bf0',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={calendarStyles.container}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          customButton: {
            text: 'Custom!',
            click: function() {
              alert('clicked the custom button!');
            }
          }
        }}
        headerToolbar={{
          left: 'prev,next today customButton',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        height="90vh"
        eventColor="#378006"
        themeSystem="bootstrap"
      />
    </div>
  );
}

export default Calendar;
