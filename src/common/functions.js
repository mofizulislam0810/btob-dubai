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
