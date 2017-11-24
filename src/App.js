import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import SearchBar from "./Components/SearchBar";
import Artist from "./Components/Artist";
import EventList from "./Components/EventList";

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
  return data.id != "" ? data : null;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: {}, artistEvents: [] };
    this.onSearch = this.onSearch.bind(this);
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
        artist = builtArtist(await artistReq.json(););
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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <SearchBar search={this.onSearch} />
          <Wrapper>
            <Artist artist={this.state.artist} />
            <EventList events={this.state.artistEvents} />
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
