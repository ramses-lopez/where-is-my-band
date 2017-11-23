import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import Browser from "./Components/Browser";

const theme = {
  primary: "#7B1FA2"
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Browser />
      </ThemeProvider>
    );
  }
}

export default App;
