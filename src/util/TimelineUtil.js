export default function ArrangeEventsByDate(events) {
  if (events.length == 0) {
    return [];
  }

  var currentDate = new Date(events[0].timestamp);
  var currentDateEventList = newDateEventList(currentDate);
  var results = [];

  events.forEach(function(event) {
    let eventDate = new Date(event.timestamp);
    if (sameDay(currentDate, eventDate)) {
      currentDateEventList["Events"].push(event);
    } else {
      currentDate = eventDate;
      results.push(currentDateEventList);
      currentDateEventList = newDateEventList(eventDate);
      currentDateEventList["Events"].push(event);
    }
  });
  results.push(currentDateEventList);
  return results;
}

function newDateEventList(currentDate) {
  return {
    Date: formatDateString(currentDate),
    Events: []
  };
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const suffix = {
  1: "st",
  2: "nd",
  3: "rd"
};

function formatDateString(date) {
  let d = date.getDate();
  let s = month[date.getMonth()] + " ";
  if (d % 10 in suffix) {
    s += d.toString(10) + suffix[d % 10];
  } else {
    s += d.toString(10) + "th";
  }
  return s;
}
