import React from "react";
import { Row } from "antd";

export default function GetSummaryRow(summary) {
  let targetArray = getAllTargets(summary);
  let replacedSummary = [summary];
  targetArray.forEach(target => {
    replacedSummary = replace(replacedSummary, target[0], getLink(target[0]));
  });
  targetArray = getNewTargets(summary);
  targetArray.forEach(target => {
    replacedSummary = replace(
      replacedSummary,
      target[0],
      getNewLink(target[0])
    );
  });
  return (
    <Row>
      <p>{replacedSummary}</p>
    </Row>
  );
}

function getNewTargets(summaryText) {
  let res = [];
  let regexp = new RegExp(/Junk Folder/g);
  res = res.concat([...summaryText.matchAll(regexp)]);
  return res;
}

function getNewLink(target) {
  return <a href={target}> {target}</a>;
}

function getAllTargets(summaryText) {
  let res = [];
  let regexp = new RegExp(
    /\S+ \S+ \(\S+@\S+\.\S+\)|Junk Folder|'Orion Limited Invoice'|\S+@\S+\.\S+/g
  );
  res = res.concat([...summaryText.matchAll(regexp)]);
  return res;
}

function getLink(target) {
  let match = target.match(/\(\S+@\S+\.\S+\)/);
  if (match) {
    let email = "mailto:" + match[0].slice(1, -1);
    return (
      <a href={email} key={email}>
        {" "}
        {target}
      </a>
    );
  }
  match = target.match(/Junk Folder/);
  if (match) {
    let folderLink = match;
    return (
      <a href={folderLink} key={folderLink}>
        {" "}
        {target}
      </a>
    );
  }
  match = target.match(/'Orion Limited Invoice'/);
  if (match) {
    let fileLink = match;
    return (
      <a href={fileLink} key={fileLink}>
        {" "}
        {target}
      </a>
    );
  }
  match = target.match(/\S+@\S+\.\S+/);
  if (match) {
    let email = match;
    return (
      <a href={"mailto:" + email} key={email}>
        {" "}
        {target}
      </a>
    );
  }
}

function replace(arr, target, link) {
  let newArr = [];
  for (let str of arr) {
    if (typeof str !== "string") {
      newArr.push(str);
      continue;
    }
    let a = str.split(target);
    for (let i = 1; i < a.length; i += 2) {
      a.splice(i, 0, link);
    }
    newArr = newArr.concat(a);
  }
  return newArr;
}
