import React, { Component } from "react";

import NotFound from "./NotFound";
import Wrapper from "./Wrapper";
import Icon from "./Icon";
import Start from "../Start";
import SearchBar from "../SearchBar";
import Artist from "../Artist";
import EventList from "../EventList";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.renderResult = this.renderResult.bind(this);
  }

  renderResult() {
    console.log(this.props.artist);
    if (this.props.artist.found === false) {
      return (
        <NotFound>
          Sorry, Artist/Band not found
          <Icon big primary className="fa fa-frown-o" left />
        </NotFound>
      );
    }
    if (!this.props.artist.name) {
      return <Start />;
    }
    return (
      <Wrapper>
        <Artist artist={this.props.artist} />
        <EventList
          events={this.props.events}
          setActiveEvent={this.props.setActiveEvent}
        />
      </Wrapper>
    );
  }

  render() {
    return (
      <div>
        <SearchBar search={this.props.search} />
        {this.renderResult()}
      </div>
    );
  }
}

export default HomePage;
