export const numberWithCommas = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dateFormater = (date: Date) => {
  return date.toISOString().split("T")[0].replaceAll("-", ".");
};
