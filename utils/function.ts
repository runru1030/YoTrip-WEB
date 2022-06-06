export const numberWithCommas = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dateFormater = (date: string) => {
  return new Date(date).toISOString().split("T")[0].replaceAll("-", ".");
};
