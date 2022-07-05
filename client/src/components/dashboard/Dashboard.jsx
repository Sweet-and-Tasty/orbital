// this file should no longer be here and should be using calendar instead

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import momentPlugin from "@fullcalendar/moment";

const Dashboard = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let mapEvents = [];
      const res = await axios.get("/api/event");
      res.data.map((event) => {
        mapEvents.push({
          id: event._id,
          title: event.title,
          start: moment(event.startDateTime).format(),
        });
      });

      setEvents(mapEvents);
    };
    fetchEvents();
  }, []);

  function EventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>

        <i className="ml-1"> {eventInfo.event.title}</i>
      </>
    );
  }

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
  };
  return (
    <div className="container mx-auto my-auto ">
      <h1>Welcome to dashboard,</h1>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          momentPlugin,
        ]}
        titleFormat={"MMMM YYYY"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        //weekends={this.state.weekendsVisible}
        events={events} // alternatively, use the `events` setting to fetch from a feed
        eventTimeFormat={"h:mm a"}
        select={handleDateSelect}
        eventContent={EventContent} // custom render function
        eventClick={handleEventClick}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
