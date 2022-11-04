import { intervalToDuration, parse } from "date-fns";

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
  // console.log(input[0].departure, "================");
  // console.log(input[input.length - 1].arrival, "++++++++=====");

  const res = intervalToDuration({
    start: parse(input[0].departure, "yyyy-MM-dd H:m:s", new Date()),
    end: parse(input[input.length - 1].arrival, "yyyy-MM-dd H:m:s", new Date()),
  });

  // console.log(res, "============");
  return res.days === 0
    ? res.hours === 0
      ? `${res.minutes}m`
      : `${res.hours}h ${res.minutes}m`
    : `${res.days}d ${res.hours}h ${res.minutes}m`;
};
