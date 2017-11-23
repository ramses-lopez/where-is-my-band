import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import SearchBar from "./Components/SearchBar";

const theme = {
  primary: "#7B1FA2"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { artis: {} };

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {}

  onSearch(query) {
    const baseUrl = "https://rest.bandsintown.com";
    const appId = "?app_id=wimb";

    // let artists = {};
    // let artistsEvents = [];

    fetch(baseUrl + "/artists/" + encodeURIComponent(query) + appId)
      .then(resp => resp.json())
      .then(function(artist) {});
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
