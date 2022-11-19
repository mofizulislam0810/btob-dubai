import { format, intervalToDuration, parse } from "date-fns";
import countries from "../JSON/countries.json";
import airports from "../JSON/airports.json";


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
    ? `${Math.floor(totalMinutes / 1440)}d ${Math.floor(
      (totalMinutes % 1440) / 60
    )}h ${(totalMinutes % 1440) % 60}m`
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

export const ISODateFormatter = (input) => {
  return format(new Date(input), "yyyy-MM-dd");
};

export const getCountryNameFomCountryCode = (input) => {
  return countries.find((obj) => {
    return obj.code === input;
  })?.name;
};

export const getCountryCode = (input) => {
  // return countries.find((obj) => {
  //   return obj.code === input;
  // })?.name;
 console.log(input);
 let list = airports.find((obj) => obj.iata === input);
 console.log(list.country,"++++");
 return list.country
};


export const getCountryFomAirport = (input) => {
  return airports.find((obj) => {
    return obj.iata === input;
  })?.country;
};



export const sumRating = (agent) => {
  let total = 0;
    agent?.forEach(a => {
         total+= a.totalPrice * a.passengerCount;
    });
return total;
}

export const moveToFirstPlace = (arr, text) => {
  arr.map((elem, index) => {
    if (elem?.platingCarrier === text) {
      arr.splice(index, 1);
      arr.splice(0, 0, elem);
    }
  });
  return arr;
};