import React from "react";
import "./Timeline.css";
import { Timeline } from "antd";
import Event from "../Event/Event";
import "antd/dist/antd.css";
import ArrangeEventsByDate from "../../util/TimelineUtil";
import DateDot from "../../Components/DateDot/DateDot";
import { FaCircle } from "react-icons/fa";

export default function Timeline(props) {
  const eventListByDate = ArrangeEventsByDate(props.data);
  return (
    <Timeline mode="left" className="Timeline">
      {GetAllTimelineItems(eventListByDate)}
    </Timeline>
  );
}

function getDateDot(dateStr) {
  return (
    <Timeline.Item
      dot={<DateDot date={dateStr} />}
      style={{ height: "60px" }}
      key={dateStr}
    />
  );
}

function GetAllTimelineItems(eventListByDate) {
  var allItems = [];
  eventListByDate.forEach(date => {
    allItems.push(getDateDot(date.Date));
    allItems.push(TimelineItemsForDate(date.Events, date.Date));
  });
  return allItems;
}

function TimelineItemsForDate(eventsList, dateStr) {
  var res = [];

  eventsList.forEach((event, index) => {
    var alertColor = getAlertColor(event);
    var timeString = getTimeString(event);
    var key = dateStr + index.toString();
    res.push(
      <Timeline.Item
        label={<div>{timeString}</div>}
        dot={<FaCircle style={{ color: alertColor }} />}
        key={key}
      >
        <Event data={event} />
      </Timeline.Item>
    );
  });
  return res;
}

function getTimeString(event) {
  var eventTS = new Date(event.timestamp);
  var isAM = true;
  if (eventTS.getHours() >= 12) {
    isAM = false;
  }

  var eventHour = eventTS.getHours();
  if (eventHour === 0) {
    eventHour = 12;
  }
  if (eventHour > 12) {
    eventHour = eventHour % 12;
  }

  var eventMinutes = eventTS.getMinutes();
  var eventMinutesString = eventMinutes.toString();
  if (eventMinutes < 10) {
    eventMinutesString = "0" + eventMinutesString;
  }

  return (
    eventHour.toString() + ":" + eventMinutesString + " " + (isAM ? "AM" : "PM")
  );
}

function getAlertColor(event) {
  switch (event["level"]) {
    case "warning":
      return "orange";
    case "critical":
      return "red";
    default:
      return "blue";
  }
}
