import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import SearchBar from "./Components/SearchBar";
import Artist from "./Components/Artist";
import EventList from "./Components/EventList";

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

const theme = {
  primary: "#7B1FA2"
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

      const artistResp = await fetch(getArtistURL(query));
      artist = await artistResp.json();

      const excerptResp = await fetch(getExcerptURL(artist.name));
      excerpt = await excerptResp.json();
      excerpt =
        excerpt.query.pages[
          Object.keys(excerpt.query.pages)[0]
        ].extract.substring(0, 150) + "...";

      artist = { ...artist, excerpt };

      if (artist.upcoming_event_count > 0) {
        const eventResp = await fetch(getEventsURL(query));
        artistEvents = await eventResp.json();
      }

      this.setState({ artist, artistEvents }, () => {
        console.log(this.state);
      });
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
