import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Route, Redirect, withRouter } from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";

import {
  getArtistURL,
  getEventsURL,
  getExcerptURL,
  builtExcerpt,
  builtArtist
} from "./utils";

import HomePage from "./Components/HomePage";
import EventPage from "./Components/EventPage";

// const history = createBrowserHistory();
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
        artist = { found: false };
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

  setActiveEvent(activeEvent) {
    this.setState({ activeEvent }, () => {
      console.log("called");
      this.props.history.push("/event");
    });
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
                  data={this.state.activeEvent}
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
