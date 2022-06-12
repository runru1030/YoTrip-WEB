import Span from "components/_atoms/Span";
import React from "react";
import { dateFormater } from "utils/function";
interface IProps {
  startDate: Date;
  endDate: Date;
}
const DateContainer: React.FC<IProps> = ({ startDate, endDate }) => {
  return (
    <Span
      textColor="gray300"
      fontWeight="semiBold"
      fontSize="sm"
      letterSpacing="1px"
    >
      {dateFormater(startDate)} -{dateFormater(endDate)}
    </Span>
  );
};

export default DateContainer;
