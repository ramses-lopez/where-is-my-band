import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Route, Redirect, withRouter } from "react-router-dom";

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
    // getting artist/events from localStorage
    try {
      const artist = JSON.parse(localStorage.getItem("artist"));
      const artistEvents = JSON.parse(localStorage.getItem("artistEvents"));

      if (artist) {
        this.setState({ artist, artistEvents });
      }
    } catch (e) {
      console.log("couldn't retrieve cache", e);
    }
  }

  // Handling artist/band search
  onSearch(query) {
    (async () => {
      let artist = {};
      let artistEvents = [];
      let excerpt = null;

      // requesting artist data
      try {
        const artistReq = await fetch(getArtistURL(query));
        artist = builtArtist(await artistReq.json());
      } catch (e) {
        // assuming that if the try block failed it'll be because it couldn't
        // find the artist/band (as currently the API is providing an invalid
        // response in said case)
        artist = { found: false };
      }

      // if the artist was found request the excerpt
      if (artist.found) {
        const excerptReq = await fetch(getExcerptURL(artist.name));
        excerpt = builtExcerpt(await excerptReq.json());
      }

      // composing artist data + excerpt
      artist = { ...artist, excerpt };

      // if the artist has upcoming events, request them
      if (artist.upcoming_event_count > 0) {
        const eventReq = await fetch(getEventsURL(query));
        artistEvents = await eventReq.json();
      }

      this.setState({ artist, artistEvents }, () => {
        // Saving the search result to localStorage
        try {
          localStorage.setItem("artist", JSON.stringify(artist));
          localStorage.setItem("artistEvents", JSON.stringify(artistEvents));
        } catch (e) {
          console.log("Failed to cache data", e);
        }
      });
    })();
  }

  // Handling when the user wants to see the details of an event
  setActiveEvent(activeEvent) {
    return e => {
      console.log(e);
      this.setState({ activeEvent }, () => {
        this.props.history.push("/event");
      });
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                search={this.onSearch}
                artist={this.state.artist}
                events={this.state.artistEvents}
                setActiveEvent={this.setActiveEvent}
              />
            )}
          />

          <Route
            path="/event"
            render={() => {
              return this.state.artist && this.state.activeEvent.venue ? (
                <EventPage
                  artist={this.state.artist}
                  event={this.state.activeEvent}
                />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
