import React, { Component } from "react";
import { transparentize } from "polished";
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
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 15px;
`;

const Button = styled.button`
  padding: 10px 25px;
  background: transparent;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  margin-left: ${props => (props.left ? "auto" : "15px")};
  margin-right: ${props => (props.right ? "auto" : "15px")};

  &:hover {
    cursor: pointer;
    background: ${props => transparentize(0.9, props.theme.primary)};
  }
`;

const Icon = styled.span`
  color: ${props => (props.primary ? props.theme.primary : "white")};
  font-size: ${props => (props.big ? "80px" : "2px")};
  padding-right: ${props => (props.left ? "15px" : "0px")};
  padding-left: ${props => (props.right ? "15px" : "0px")};
`;

const Empty = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  font-size: 30px;
  margin-top: 50px;
`;

const renderEvents = events => {
  return events && events.length > 0 ? (
    events.map(e => <Event key={e.id} data={e} />)
  ) : (
    <Empty>
      Sorry, No upcoming events.
      <Icon big primary className="fa fa-frown-o" left />
    </Empty>
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
          {this.state.page > 0 && (
            <Button left onClick={this.handlePage(-1)}>
              <Icon className="fa fa-arrow-left" left />
              Prev
            </Button>
          )}
          {this.state.page < Math.ceil(this.props.events.length / 4) - 1 && (
            <Button right onClick={this.handlePage(+1)}>
              Next
              <Icon className="fa fa-arrow-right" right />
            </Button>
          )}
        </ButtonHolder>
      </Wrapper>
    );
  }
}

export default EventList;
