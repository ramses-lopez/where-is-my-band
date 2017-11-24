import React from "react";
import styled from "styled-components";

const Card = styled.div`
  list-style-type: none;
  background: #7b1fa2;
  color: white;
  padding: 15px;
  border-radius: 0px 3px 3px 0px;
  width: 100%;
  margin: 15px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }

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
  data: { venue, datetime: date, on_sale_datetime: onSale }
}) => {
  return (
    <Card>
      <Venue>{venue.name}</Venue>
      <City>{`${venue.city}, ${venue.country}`}</City>
      <EventDate>Date: {new Date(date).toLocaleDateString()}</EventDate>
      <TicketDate>
        Tickets available:{" "}
        {onSale ? new Date(onSale).toLocaleDateString() : " TBA"}
      </TicketDate>
    </Card>
  );
};

export default EventPage;
