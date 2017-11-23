import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import SearchBar from "./Components/SearchBar";

const baseUrl = "https://rest.bandsintown.com";
const appId = "?app_id=wimb";

const theme = {
  primary: "#7B1FA2"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: {}, artistEvents: [] };
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {}

  onSearch(query) {
    (async () => {
      let artist = {};
      let artistEvents = [];

      const artistResp = await fetch(
        `${baseUrl}/artists/${encodeURI(query)}${appId}`
      );
      artist = await artistResp.json();

      if (artist.upcoming_event_count > 0) {
        const eventEesp = await fetch(
          `${baseUrl}/artists/${encodeURI(query)}/events${appId}`
        );
        artistEvents = await eventEesp.json();
      }

      this.setState({ artist, artistEvents }, () => {
        console.log(this.state);
      });
    })();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SearchBar search={this.onSearch} />
      </ThemeProvider>
    );
  }
}

export default App;
