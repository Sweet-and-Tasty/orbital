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
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Dashboard = ({ auth: { user } }) => {
  const [events, setEvents] = useState();

  useEffect(() => {
    loadUser();
    console.log(user);
    const fetchEvents = async () => {
      let mapEvents = [];
      const res = await axios.get("/api/event");
      res.data.map((event) => {
        if (user.events.includes(event._id)) {
          mapEvents.push({
            id: event._id,
            title: event.title,
            start: moment(event.startDateTime).format(),
          });
        }
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
    if (window.confirm(`view event '${clickInfo.event.title}' ?`)) {
      window.open("/my-meetups");
    }
  };

  const handleDateSelect = (selectInfo) => {
    if (window.confirm("create new event?")) {
      window.open(`/new-meetup/${selectInfo.start}`);
    }
  };
  return (
    <div className="container mx-auto my-auto ">
      <h1 className="page-title">Welcome to dashboard</h1>
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
        editable={false}
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
