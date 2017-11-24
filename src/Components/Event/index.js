import React from "react";

import Card from "./Card";
import Venue from "./Venue";
import City from "./City";
import EventDate from "./EventDate";
import TicketDate from "./TicketDate";

const Event = ({
  data: { venue, datetime: date, on_sale_datetime: onSale }
}) => (
  <Card>
    <Venue>{venue.name}</Venue>
    <City>{`${venue.city}, ${venue.country}`}</City>
    <EventDate>Date: {new Date(date).toLocaleDateString()}</EventDate>
    <TicketDate>
      Tickets available:
      {onSale ? new Date(onSale).toLocaleDateString() : " TBA"}
    </TicketDate>
  </Card>
);

export default Event;
