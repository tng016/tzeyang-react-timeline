import React, { Component } from "react";
import "./Event.css";
import EventLabel from "../../Components/EventLabel/EventLabel";
import Alert from "../../Components/Alert/Alert";
import TagRow from "../../Components/Tag/Tag";
import GetSummaryRow from "../../util/EventUtil";
import { Row, Col } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class Event extends Component {
  render() {
    let isToggled = this.props.t[this.props.data.timestamp];
    let alertRow;
    if (isToggled) {
      alertRow = getAlertRow(this.props.data.alert);
    }
    return (
      <div className="Event" key={"event" + this.props.data.timestamp}>
        {getTitleRow(this.props.data, this.props.onToggle, isToggled)}
        {getSubtitleRow(this.props.data.subtitle)}
        {GetSummaryRow(this.props.data.summary)}
        {alertRow}
        {getTagRow(this.props.data.tags)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    t: state.toggles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: ts =>
      dispatch({ type: actionTypes.TOGGLE_EVENT_EXPAND, timestamp: ts })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

function getSubtitleRow(subtitle) {
  if (subtitle) {
    return (
      <Row>
        <p className="Subtitle"> {subtitle} </p>
      </Row>
    );
  }
}

function getTitleRow(event, onToggle, isToggled) {
  let width = 24;
  var titleCol = event.label ? 16 : 23;
  width = width - titleCol - 1;

  var label = event.label ? (
    <Col span={7} key={"label"}>
      <EventLabel label={event.label} />
    </Col>
  ) : (
    undefined
  );

  return (
    <Row justify="start">
      <Col span={titleCol} key={"title"}>
        <p padding="10px">
          <b>{event.title}</b>
        </p>
      </Col>
      {label}
      {getIcon(event, onToggle, isToggled)}
    </Row>
  );
}

function getIcon(event, onToggle, isToggled) {
  if (event.alert === undefined) {
    return undefined;
  }
  var icon = isToggled ? (
    <UpOutlined
      onClick={() => onToggle(event.timestamp)}
      style={{ cursor: "pointer" }}
    />
  ) : (
    <DownOutlined
      onClick={() => onToggle(event.timestamp)}
      style={{ cursor: "pointer" }}
    />
  );
  return (
    <Col span={1} key={"expand"}>
      {icon}
    </Col>
  );
}

function getAlertRow(alert) {
  if (alert) {
    return (
      <Row>
        <Alert alert={alert} />
      </Row>
    );
  }
}

function getTagRow(tags) {
  if (tags) {
    return <TagRow tags={tags} key={"tag"} />;
  }
}
