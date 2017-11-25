import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  getArtistURL,
  getEventsURL,
  getExcerptURL,
  builtExcerpt,
  builtArtist
} from "./utils";

import HomePage from "./Components/HomePage";
import EventPage from "./Components/EventPage";

const theme = { primary: "#7B1FA2" };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: {}, artistEvents: [], activeEvent: {} };
    this.onSearch = this.onSearch.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
  }

  componentDidMount() {
    let artist = {};
    let artistEvents = [];

    try {
      artist = JSON.parse(localStorage.getItem("artist"));
      artistEvents = JSON.parse(localStorage.getItem("artistEvents"));

      if (artist) {
        this.setState({ artist, artistEvents });
      }
    } catch (e) {
      console.log("couldn't retrieve cache", e);
    }
  }

  onSearch(query) {
    (async () => {
      let artist = {};
      let artistEvents = [];
      let excerpt = null;

      try {
        const artistReq = await fetch(getArtistURL(query));
        artist = builtArtist(await artistReq.json());
      } catch (e) {
        artist = null;
      }

      if (artist) {
        const excerptReq = await fetch(getExcerptURL(artist.name));
        excerpt = builtExcerpt(await excerptReq.json());
      }

      artist = { ...artist, excerpt };

      if (artist.upcoming_event_count > 0) {
        const eventReq = await fetch(getEventsURL(query));
        artistEvents = await eventReq.json();
      }

      this.setState({ artist, artistEvents }, () => {
        try {
          localStorage.setItem("artist", JSON.stringify(artist));
          localStorage.setItem("artistEvents", JSON.stringify(artistEvents));
        } catch (e) {
          console.log("Failed to cache data", e);
        }
      });
    })();
  }

  setActiveEvent() {}

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.artist ? (
                  <HomePage
                    search={this.onSearch}
                    artist={this.state.artist}
                    events={this.state.artistEvents}
                    setActiveEvent={this.setActiveEvent}
                  />
                ) : null;
              }}
            />

            <Route
              path="/event/:index"
              render={() => {
                return this.state.artist && this.state.artistEvents[0] ? (
                  <EventPage
                    artist={this.state.artist}
                    data={this.state.artistEvents[0]}
                  />
                ) : null;
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
