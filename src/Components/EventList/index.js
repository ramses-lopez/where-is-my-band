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
  font-size: ${props => (props.big ? "80px" : "20px")};
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

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };

    this.handlePage = this.handlePage.bind(this);
    this.getTarget = this.getTarget.bind(this);
    this.getPageCount = this.getPageCount.bind(this);
  }

  getTarget(delta) {
    return this.state.page + delta;
  }

  getPageCount() {
    return Math.ceil(this.props.events.length / 4) - 1;
  }

  handlePage(delta) {
    const target = this.getTarget(delta);
    const pageCount = this.getPageCount();
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

  renderEvents(events) {
    return events && events.length > 0 ? (
      events.map(e => <Event key={e.id} data={e} />)
    ) : (
      <Empty>
        Sorry, No upcoming events.
        <Icon big primary className="fa fa-frown-o" left />
      </Empty>
    );
  }

  renderButton(delta) {
    const target = this.getTarget(delta);
    const pageCount = this.getPageCount();

    if (target > 0 && target < pageCount) {
      return (
        <Button
          left={delta < 0}
          right={delta > 0}
          onClick={this.handlePage(delta)}
        >
          {delta < 0 && <Icon className={"fa fa-arrow-left"} left primary />}
          {delta < 0 ? "Prev" : "Next"}
          {delta > 0 && <Icon className={"fa fa-arrow-right"} right primary />}
        </Button>
      );
    }
  }

  render() {
    return (
      <Wrapper>
        {this.renderEvents(this.getCurrentEvents())}
        <ButtonHolder>
          {this.renderButton(-1)}
          {this.renderButton(+1)}
        </ButtonHolder>
      </Wrapper>
    );
  }
}

export default EventList;
