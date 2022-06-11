import { Timestamp } from "firebase/firestore";

export const numberWithCommas = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dateFormater = (date: Date) => {
  return new Date(date).toISOString().split("T")[0].replaceAll("-", ".");
};
export const timeStampFormater = (time: Timestamp) => {
  return new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
    .toISOString()
    .split("T")[0]
    .replaceAll("-", ".");
};
export const timeStampToDate = (time: Timestamp) => {
  return new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
};

export const jsonConverter = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
