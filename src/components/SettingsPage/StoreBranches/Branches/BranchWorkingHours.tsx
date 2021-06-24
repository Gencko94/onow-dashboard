import React, { useMemo } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { WiTime8, WiTime12 } from "react-icons/wi";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";

import TableHead from "../../../reusable/TableHead";
import TimeIconedInput from "../../../reusable/TimeIconedInput";

interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}
const days: [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
] = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
const BranchWorkingHours = ({ control, errors, register }: IProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const cols = useMemo(
    () => [
      { title: "days", sortable: false },
      { title: "from", sortable: false },
      { title: "to", sortable: false },
    ],
    []
  );
  const working_hours = useWatch({
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
          {days.map((day) => {
            return (
              <React.Fragment key={day}>
                <Controller
                  control={control}
                  name={`working_hours.${day}.enabled` as any}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <CheckToggle
                        checked={value}
                        onChange={onChange}
                        label={t(day)}
                      />
                    );
                  }}
                />

                <TimeIconedInput
                  enabled={working_hours?.[day]?.enabled}
                  control={control}
                  errors={errors}
                  Icon={WiTime8}
                  name={`working_hours.${day}.from`}
                />
                <TimeIconedInput
                  enabled={working_hours?.saturday?.enabled}
                  control={control}
                  errors={errors}
                  Icon={WiTime12}
                  name="working_hours.saturday.to"
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default BranchWorkingHours;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, border, bodyColor } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: ${bodyColor};
    border: ${border};
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
