import React, { Component } from "react";
import SearchBar from "../SearchBar";
import Artist from "../Artist";
import EventList from "../EventList";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

class HomePage extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <SearchBar search={this.props.search} />
        <Wrapper>
          <Artist artist={this.props.artist} />
          <EventList events={this.props.events} />
        </Wrapper>
      </div>
    );
  }
}

export default HomePage;
