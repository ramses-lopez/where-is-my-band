import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EventPage from "./Components/EventPage";

const theme = { primary: "#7B1FA2" };

const baseUrl = "https://rest.bandsintown.com";
const appId = "?app_id=wimb";

const getArtistURL = query => {
  return `${baseUrl}/artists/${encodeURI(query)}${appId}`;
};

const getEventsURL = query => {
  return `${baseUrl}/artists/${encodeURI(query)}/events${appId}`;
};

const getExcerptURL = query => {
  return `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&redirects=1&exintro=&explaintext=&titles=${encodeURI(
    query
  )}`;
};

const builtExcerpt = data => {
  return !data.query.pages[-1]
    ? data.query.pages[Object.keys(data.query.pages)[0]].extract.substring(
        0,
        150
      ) + "..."
    : null;
};

const builtArtist = data => {
  return data.id !== "" ? data : null;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: {}, artistEvents: [], activeEvent: {} };
    this.onSearch = this.onSearch.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
  }

  componentDidMount() {
    this.onSearch("maroon 5");
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

      this.setState({ artist, artistEvents });
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
                return (
                  <HomePage
                    search={this.onSearch}
                    artist={this.state.artist}
                    events={this.state.artistEvents}
                    setActiveEvent={this.setActiveEvent}
                  />
                );
              }}
            />

            <Route
              path="/event/:index"
              render={ () => {
                return this.state.artist && this.state.artistEvents[0] ? (<EventPage artist={ this.state.artist } data={ this.state.artistEvents[0] } />) : null ;
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
