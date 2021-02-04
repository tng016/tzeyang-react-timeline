import React from "react";
import "./style.css";
import PaginatedTimeline from "./Containers/PaginatedTimeline/PaginatedTimeline";
import "antd/dist/antd.css";
import reducer from "./store/reducer";

export default function App() {
  const data = require("./data.json");
  reducer.initialiseToggles(data.timeline);
  return <PaginatedTimeline data={data["timeline"]} />;
}
