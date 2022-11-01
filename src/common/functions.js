export const getCabinClass = (input) => {
  if (input === "Economy") return 1;
  else if (input === "Business") return 3;
  else if (input === "First") return 4;
  else return 1;
};
