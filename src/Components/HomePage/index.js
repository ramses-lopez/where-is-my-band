import React from "react";

import NotFound from "./NotFound";
import Wrapper from "./Wrapper";
import Icon from "./Icon";
import Start from "../Start";
import SearchBar from "../SearchBar";
import Artist from "../Artist";
import EventList from "../EventList";

const Result = ({ artist, events, setActiveEvent }) => {
  // checking if the search yield any result
  if (artist.found === false) {
    return (
      <NotFound>
        Sorry, Artist/Band not found
        <Icon big primary className="fa fa-frown-o" left />
      </NotFound>
    );
  }

  // this will be false if no search has been done
  if (!artist.name) {
    return <Start />;
  }

  // rendering results
  return (
    <Wrapper>
      <Artist artist={artist} />
      <EventList events={events} setActiveEvent={setActiveEvent} />
    </Wrapper>
  );
};

const HomePage = ({ search, artist, events, setActiveEvent }) => {
  return (
    <div>
      <SearchBar search={search} />
      <Result artist={artist} events={events} setActiveEvent={setActiveEvent} />
    </div>
  );
};

export default HomePage;
