import React, { Component } from "react";

import Wrapper from "./Wrapper";
import SearchBar from "../SearchBar";
import Artist from "../Artist";
import EventList from "../EventList";

class HomePage extends Component {
  render() {
    return (
      <div>
        <SearchBar search={this.props.search} />
        <Wrapper>
          <Artist artist={this.props.artist} />
          <EventList
            events={this.props.events}
            setActiveEvent={this.props.setActiveEvent}
          />
        </Wrapper>
      </div>
    );
  }
}

export default HomePage;
