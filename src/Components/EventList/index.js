import React, { Component } from "react";

import Wrapper from "./Wrapper";
import ButtonHolder from "./ButtonHolder";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import Event from "../Event";

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
