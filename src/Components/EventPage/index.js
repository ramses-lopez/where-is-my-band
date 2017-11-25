import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      )}
    </GoogleMap>
  ))
);

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  top: 15px;
  right: 15px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: ${props => props.theme.primary};
  background: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: all 0.2s linear;

  &:hover {
    background: white;
  }
`;

const Card = styled.div`
  position: relative;
  margin: 15px;
  background: #7b1fa2;
  color: white;
  padding: 15px;
`;

const Venue = styled.h1`
  font-size: 30px;
  color: white;
  font-weight: bold;
  margin: 0 0 15px;
`;
const City = styled.div`
  font-size: 20px;
`;
const EventDate = styled.div`
  display: inline-block;
  margin-left: auto;
  font-size: 20px;
`;
const TicketDate = styled.div`
  font-size: 20px;
`;

const EventPage = ({
  event: { venue, datetime: date, on_sale_datetime: onSale },
  artist
}) => {
  return (
    <Card>
      <StyledLink to="/" className="fa fa-arrow-left" />
      <h1>{artist.name}</h1>
      <Venue>{venue.name}</Venue>
      <City>{`${venue.city}, ${venue.country}`}</City>
      <EventDate>Date: {new Date(date).toLocaleDateString()}</EventDate>
      <TicketDate>
        Tickets available:{" "}
        {onSale ? new Date(onSale).toLocaleDateString() : " TBA"}
      </TicketDate>
      <br />
      <MyMapComponent
        isMarkerShown
        lat={parseFloat(venue.latitude)}
        lng={parseFloat(venue.longitude)}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAcpgP1ZvrUvsaQnGI2DH2uVwzO5fs1cWU"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Card>
  );
};

export default EventPage;
