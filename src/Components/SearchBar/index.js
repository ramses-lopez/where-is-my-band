import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    box-shadow: 0px 0px 25px #000;
    display: block;
    width: 300px;
    max-width: 90%;
    height: 5px;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
`;

const Input = styled.input`
  background: white;
  border: none;
  font-size: 16px;
  line-height: 50px;
  height: 50px;
  width: 100%;
  max-width: 300px;
  border-radius: 3px 0px 0px 3px;
  outline: none;
  padding-left: 15px;
`;

const Icon = styled.button.attrs({
  type: "submit"
})`
  border: none;
  background: #7b1fa2;
  color: white;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  padding: 0px 15px;
  border-radius: 0px 3px 3px 0px;
`;

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
