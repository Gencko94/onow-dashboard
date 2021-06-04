import { useMemo } from "react";
import { Control, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { WiTime8, WiTime12 } from "react-icons/wi";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import DateIconedInput from "../../../reusable/Inputs/DateIconedInput";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Select from "../../../reusable/Select";
import TableHead from "../../../reusable/TableHead";
import TimeIconedInput from "../../../reusable/TimeIconedInput";

interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}

const BranchWorkingHours = ({ control, errors, register }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const cols = useMemo(
    () => [
      { title: "days", sortable: false },
      { title: "from", sortable: false },
      { title: "to", sortable: false },
    ],
    []
  );
  const workingHours = useWatch({
    control,
    name: "working_hours",
  });

  return (
    <Container>
      <div className="title-container">
        <h5>Branch Working Hours</h5>
      </div>
      <div className="box">
        <TableHead gap="2rem" cols={cols} gridCols="1fr 0.5fr 0.5fr" />
        <div className="table">
          {/* Saturday */}
          <CheckToggle
            control={control}
            label="Saturday"
            name="working_hours.saturday.enabled"
          />
          <TimeIconedInput
            enabled={workingHours.saturday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime8}
            name="working_hours.saturday.from"
          />
          <TimeIconedInput
            enabled={workingHours.saturday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime12}
            name="working_hours.saturday.to"
          />
          {/* Sunday */}
          <CheckToggle
            control={control}
            label="Sunday"
            name="working_hours.sunday.enabled"
          />
          <TimeIconedInput
            enabled={workingHours.sunday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime8}
            name="working_hours.sunday.from"
          />
          <TimeIconedInput
            enabled={workingHours.sunday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime12}
            name="working_hours.sunday.to"
          />
          {/* Monday */}
          <CheckToggle
            control={control}
            label="Monday"
            name="working_hours.monday.enabled"
          />
          <TimeIconedInput
            enabled={workingHours.monday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime8}
            name="working_hours.monday.from"
          />
          <TimeIconedInput
            enabled={workingHours.monday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime12}
            name="working_hours.monday.to"
          />
          {/* Tuesday */}
          <CheckToggle
            control={control}
            label="Tuesday"
            name="working_hours.tuesday.enabled"
          />
          <TimeIconedInput
            enabled={workingHours.tuesday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime8}
            name="working_hours.tuesday.from"
          />
          <TimeIconedInput
            enabled={workingHours.tuesday.enabled}
            control={control}
            errors={errors}
            Icon={WiTime12}
            name="working_hours.tuesday.to"
          />
        </div>
      </div>
    </Container>
  );
};

export default BranchWorkingHours;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
   }
.table {
    padding: 1rem;    
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items:center;
  }
  @media ${breakpoints.md} {
    .table {

        grid-template-columns: 1fr 0.5fr 0.5fr;
      }
  }
  `
);
