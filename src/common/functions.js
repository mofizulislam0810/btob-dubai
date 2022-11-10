import { intervalToDuration, parse } from "date-fns";
export const isValidEmail = (input) => {
  return input
    ?.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;
};
export const getCabinClass = (input) => {
  if (input === "Economy") return 1;
  else if (input === "Business") return 3;
  else if (input === "First") return 4;
  else return 1;
};

export const getPassengerType = (input) => {
  if (input === "ADT") return "Adult";
  else if (input === "CNN") return "Child";
  else if (input === "INF") return "Infant";
  else return "Adult";
};

export const totalFlightDuration = (input) => {
  let totalMinutes = 0;
  input?.map((item) => {
    let h = item.duration?.[0].length > 4 ? item.duration[0].split("h")[0] : 0;

    let m =
      item.duration?.[0].length > 4
        ? item.duration[0].split(" ")[1]?.split("m")[0]
        : item.duration[0].split("m")[0];

    totalMinutes += parseInt(h) * 60 + parseInt(m);
  });

  return totalMinutes >= 60
    ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
    : `${totalMinutes % 60}m`;
  //return `${Math.floor(totalMinutes / 60)}h+`;
};

export const addDurations = (inputArr) => {
  let arr = inputArr.map((item) => {
    return item.length > 7 ? item : `0d ${item}`;
  });

  let totalMinutes = 0;
  arr.map((item) => {
    let d = parseInt(item.split(" ")[0].slice(0, -1));
    let h = parseInt(item.split(" ")[1].slice(0, -1));
    let m = parseInt(item.split(" ")[2].slice(0, -1));

    totalMinutes += parseInt(d) * 24 * 60 + parseInt(h) * 60 + parseInt(m);
  });

  return totalMinutes >= 1440
    ? `${totalMinutes / 1440}d ${(totalMinutes % 1440) / 60}d ${
        (totalMinutes % 1440) % 60
      }m`
    : totalMinutes >= 60
    ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
    : `${totalMinutes % 60}m`;
};

// INTERVAL BETWEEN SEGMENTS
export const timeDuration = (start, end) => {
  const result = intervalToDuration({
    start: parse(start, "yyyy-MM-dd H:m:s", new Date()),
    end: parse(end, "yyyy-MM-dd H:m:s", new Date()),
  });

  return `${result.hours}h ${result.minutes}m`;
};
