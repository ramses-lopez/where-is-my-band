import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.li`
  list-style-type: none;
  background: #7b1fa2;
  color: white;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 0px 3px 3px 0px;
`;

class Event extends Component {
  render() {
    return (
      <Card>
        <h1>
          {this.props.eventData.venue.name}
        </h1>
        <h3>{this.props.eventData.venue.city}, {this.props.eventData.venue.country}</h3>
        <h2>{this.props.eventData.datetime.toLocaleString()}</h2>
        <h4>Tickets available {this.props.eventData.on_sale_datetime}</h4>
        <input type="button" value='Details'/>
      </Card>
    );
  }
}

export default Event;
