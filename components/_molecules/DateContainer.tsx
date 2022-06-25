import Span from "components/_atoms/Span";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { dateFormater, timeStampFormater } from "utils/function";
interface IProps {
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  type?: "Date" | "Timestamp";
}
const DateContainer: React.FC<IProps> = ({
  startDate,
  endDate,
  type = "Timestamp",
}) => {
  return (
    <Span
      textColor="gray300"
      fontWeight="semiBold"
      fontSize="sm"
      letterSpacing="1px"
    >
      {type === "Date" ? (
        <>
          {dateFormater(startDate as Date)} -{dateFormater(endDate as Date)}
        </>
      ) : (
        <>
          {timeStampFormater(startDate as Timestamp)} -
          {timeStampFormater(endDate as Timestamp)}
        </>
      )}
    </Span>
  );
};

export default DateContainer;
