import React, { Component } from "react";
import styled from "styled-components";
import Event from "../Event";

const List = styled.ul`
  padding: 10px 15px;
  border-radius: 0px 3px 3px 0px;
`;

const renderEvents = events => {
  return (events && events.length > 0) ?
    events.map(e => <Event key={e.id} eventData={e}/>) :
    (<span>No upcoming events</span>)
}

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };

    this.handlePage = this.handlePage.bind(this)
  }

  handlePage(delta) {
    const target = this.state.page + delta
    const pageCount = Math.ceil(this.props.events.length/6) - 1

    const validateLimits = () => {
      if(target > pageCount) return pageCount
      if(target < 0) return 0
      return target
    }

    return () => this.setState({page: validateLimits() })
  }

  getCurrentEvents() {
    return this.props.events.slice(6*this.state.page, 6 * this.state.page + 6)
  }

  render() {
    return (
      <section>
        <button onClick={this.handlePage(-1)}>prev</button>
        <button onClick={this.handlePage(+1)}>next</button>
        <List> { renderEvents(this.getCurrentEvents()) } </List>
      </section>
    )
  }
}

export default EventList;
