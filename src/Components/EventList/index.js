import React, { Component } from "react";
import styled from "styled-components";
import Event from "../Event";

const List = styled.ul`
  padding: 10px 15px;
  border-radius: 0px 3px 3px 0px;
`;

const renderEvents = events => {
  return (events && events.length > 0) ?
    events.map(e => <Event key={e.id} eventData={e}/>) :
    (<span>No upcoming events</span>)
}

class EventList extends Component {
  render() {
    return (
      <section>
        <List> { renderEvents(this.props.events) } </List>
      </section>
    )
  }
}

export default EventList;
