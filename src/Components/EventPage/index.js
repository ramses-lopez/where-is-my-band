import React from "react";
import styled from "styled-components";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}>
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))

const Link = styled.a`
  color: white;
`;

const Card = styled.div`
  list-style-type: none;
  background: #7b1fa2;
  color: white;
  padding: 15px;
  border-radius: 0px 3px 3px 0px;
  width: 100%;
  margin: 15px;
  transition: all 0.2s ease-in-out;

  @media (min-width: 1200px) {
    flex-basis: 40%;
    flex-grow: 1;
  }
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
  data: { venue, datetime: date, on_sale_datetime: onSale },
  artist
}) => {
  return (
    <Card>
      <Link href="/"> Back </Link> 
      <h1>{ artist.name }</h1>
      <Venue>{venue.name}</Venue>
      <City>{`${venue.city}, ${venue.country}`}</City>
      <EventDate>Date: {new Date(date).toLocaleDateString()}</EventDate>
      <TicketDate>
        Tickets available:{" "}
        {onSale ? new Date(onSale).toLocaleDateString() : " TBA"}
      </TicketDate>
      <MyMapComponent
        isMarkerShown
        lat={parseFloat(venue.latitude)}
        lng={parseFloat(venue.longitude)}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `200px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Card>
  );
};

export default EventPage;
