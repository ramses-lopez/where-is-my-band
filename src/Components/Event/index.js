import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  list-style-type: none;
  background: #7b1fa2;
  color: white;
  padding: 15px;
  border-radius: 0px 3px 3px 0px;
  width: 100%;
  margin: 15px;

  @media (min-width: 1200px) {
    flex-basis: 40%;
    flex-grow: 1;
  }
`;

const Venue = styled.h1`
  font-size: 30px;
  color: white;
  font-weight: bold;
`;

const Event = ({ data }) => (
  <Card>
    <Venue>{data.venue.name}</Venue>
    <h3>
      {data.venue.city}, {data.venue.country}
    </h3>
    <h2>{data.datetime.toLocaleString()}</h2>
    <h4>Tickets available {data.on_sale_datetime}</h4>
    <input type="button" value="Details" />
  </Card>
);

export default Event;
