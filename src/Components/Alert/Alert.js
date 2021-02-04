import React from "react";
import "./Alert.css";
import { Row, Col } from "antd";
import { WarningFilled } from "@ant-design/icons";

export default function Alert(props) {
  return (
    <div className="Alert">
      <Row>
        <Col span={2} style={{ textAlign: "center" }}>
          <WarningFilled />
        </Col>
        <Col span={22}>
          {props.alert}
        </Col>
      </Row>
    </div>
  );
}
