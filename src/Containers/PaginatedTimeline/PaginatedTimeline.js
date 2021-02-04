import React, { useState } from "react";
import Timeline from "../Timeline/Timeline";
import { Pagination } from "antd";
import "antd/dist/antd.css";

export default function PaginatedTimeline(props) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  let startIndex = (page - 1) * pageSize;
  let paginatedData = props.data.slice(startIndex, startIndex + pageSize);
  return (
    <div style={{ padding: "10px", paddingLeft: "50px" }}>
      <Timeline data={paginatedData} />
      <Pagination
        style={{ textAlign: "center" }}
        defaultCurrent={1}
        onChange={value => {
          setPage(value);
        }}
        total={props.data.length}
        defaultPageSize={pageSize}
      />
    </div>
  );
}
