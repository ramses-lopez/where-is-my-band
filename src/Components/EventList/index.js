import React, { Component } from "react";
import styled from "styled-components";
import Event from "../Event";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 600px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 66.6%;
  }
`;

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  padding: 10px 25px;
  background: transparent;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 16px;
  transition: all 0.3s linear;
  margin-left: ${props => (props.left ? "auto" : "15px")};
  margin-right: ${props => (props.right ? "auto" : "15px")};

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.03);
  }
`;

const renderEvents = events => {
  return events && events.length > 0 ? (
    events.map(e => <Event key={e.id} data={e} />)
  ) : (
    <span>No upcoming events</span>
  );
};

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };

    this.handlePage = this.handlePage.bind(this);
  }

  handlePage(delta) {
    const target = this.state.page + delta;
    const pageCount = Math.ceil(this.props.events.length / 4) - 1;

    const validateLimits = () => {
      if (target > pageCount) return pageCount;
      if (target < 0) return 0;
      return target;
    };

    return () => this.setState({ page: validateLimits() });
  }

  getCurrentEvents() {
    return this.props.events.slice(
      4 * this.state.page,
      4 * this.state.page + 4
    );
  }

  render() {
    return (
      <Wrapper>
        {renderEvents(this.getCurrentEvents())}
        <ButtonHolder>
          <Button left onClick={this.handlePage(-1)}>
            Prev
          </Button>
          <Button right onClick={this.handlePage(+1)}>
            Next
          </Button>
        </ButtonHolder>
      </Wrapper>
    );
  }
}

export default EventList;
