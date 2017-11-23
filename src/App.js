import React, { Component } from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";

const theme = {
  primary: "#7B1FA2"
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>WIMB</div>
      </ThemeProvider>
    );
  }
}

export default App;
