import React, { Component } from "react";

import Form from "./Form";
import Input from "./Input";
import Icon from "./Icon";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };

    // Binding functions
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // controlling the input field
  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  // handling the form submission this will call a
  // function passed as a prop from it's parent component named "search"
  handleForm(e) {
    e.preventDefault();
    this.props.search(this.state.search);
  }

  render() {
    return (
      <Form onSubmit={this.handleForm}>
        <Input
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <Icon className="fa fa-search" aria-hidden="true" />
      </Form>
    );
  }
}

export default SearchBar;
