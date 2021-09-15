import { subDays } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

import Spacer from "../reusable/Spacer";
import Flex from "../StyledComponents/Flex";

import Button from "../reusable/Button";
import DateInput from "../reusable/Inputs/DateIconedInput";
interface IProps {
  dates: { start: Date | null; end: Date | null };
  setDates: Dispatch<SetStateAction<{ start: Date | null; end: Date | null }>>;
}
const ReportsDatePicker = ({ dates, setDates }: IProps) => {
  const [active, setActive] = useState("Last 30 Days");
  const setStartDateLast30Days = () => {
    setDates({ start: subDays(new Date(), 30), end: new Date() });
  };
  const setStartDateLast7Days = () => {
    setDates({ start: subDays(new Date(), 7), end: new Date() });
  };
  const setStartDateToday = () => {
    setDates({ start: new Date(), end: new Date() });
  };

  return (
    <Flex padding="0.25rem 0.5rem">
      <Button
        onClick={() => {
          setStartDateToday();
          setActive("Today");
        }}
        active={active === "Today"}
        color="primary"
        appearance="toggle"
        size="sm"
      >
        Today
      </Button>
      <Spacer size={10} />
      <Button
        onClick={() => {
          setStartDateLast7Days();
          setActive("Last 7 Days");
        }}
        active={active === "Last 7 Days"}
        color="primary"
        appearance="toggle"
        size="sm"
      >
        Last 7 Days
      </Button>
      <Spacer size={10} />
      <Button
        onClick={() => {
          setStartDateLast30Days();
          setActive("Last 30 Days");
        }}
        active={active === "Last 30 Days"}
        color="primary"
        appearance="toggle"
        size="sm"
      >
        Last 30 Days
      </Button>
      <Spacer size={10} />
      <DateInput
        errors={undefined}
        startDate={dates.start}
        endDate={dates.end}
        onChange={(pickerDates: [Date | null, Date | null]) => {
          const [start, end] = pickerDates;

          setDates({
            start,
            end,
          });
        }}
        selectsRange
        // inline
      />
    </Flex>
  );
};

export default ReportsDatePicker;
