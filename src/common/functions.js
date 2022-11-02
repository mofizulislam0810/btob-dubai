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
