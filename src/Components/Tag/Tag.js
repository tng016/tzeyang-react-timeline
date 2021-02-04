import React from "react";
import { Row, Col } from "antd";
import "./Tag.css";

export default function TagRow(props) {
  let tagRows = [];
  for (let i = 0; i < props.tags.length; i += 3) {
    tagRows.push(getTagRow(props.tags.slice(i, i + 3), i));
  }
  return [tagRows];
}

function getTagRow(tags, offset) {
  let tagComponents = [];
  tags.forEach((tag, index) => {
    tagComponents.push(getTag(tag, offset + index));
  });
  return <Row key={"tagrow" + offset}>{tagComponents}</Row>;
}

function getTag(tag, key) {
  var tagClass;
  switch (tag.level) {
    case "critical":
      tagClass = "TagCritical";
      break;
    case "warning":
      tagClass = "TagWarning";
      break;
    default:
      tagClass = "TagWarning";
  }
  return (
    <Col span={8} key={"Tag" + key}>
      <div className={tagClass}>{tag.text}</div>
    </Col>
  );
}
