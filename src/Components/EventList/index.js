import React, { Component } from "react";
import styled from "styled-components";
import Event from "../Event";

const List = styled.ul`
  padding: 10px 15px;
  border-radius: 0px 3px 3px 0px;
`;

class EventList extends Component {

  render() {
    let eventList = null

    if(this.props.events && this.props.events.length > 0)
      eventList = this.props.events.map(e => <Event key={e.id} eventData={e}/>)
    else
      eventList = (<span>No upcoming events</span>)

    return (
      <section>
        <h1>Events</h1>
        <List>
          {eventList}
        </List>
      </section>
    );
  }
}

export default EventList;
