import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { WiTime8, WiTime12 } from "react-icons/wi";

import styled from "styled-components";
import { up } from "../../../../utils/themes";

import GithubInput from "../../../reusable/Inputs/GithubInput";

import TimeIconedInput from "../../../reusable/TimeIconedInput";

import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";

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
const BranchWorkingHours = () => {
  const {
    formState: { errors },

    control,
  } = useFormContext();
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const working_hours = useWatch({
    control,
    name: "working_hours",
  });
  console.log(working_hours);
  return (
    <Container>
      <Heading tag="h5" color="primary">
        Branch Working Hours
      </Heading>
      {/* <TableHead gap="2rem" cols={cols} gridCols="1fr 0.5fr 0.5fr" /> */}
      {days.map((day) => {
        return (
          <div className="box">
            <Grid
              key={day}
              cols="repeat(auto-fit,minmax(250px,1fr))"
              // cols="repeat(auto-fit,minmax(300px,1fr))"
              gap="1rem"
              p={3}
            >
              <Controller
                control={control}
                name={`working_hours.${day}.enabled` as any}
                render={({ field: { value, onChange } }) => {
                  return (
                    <GithubInput
                      checked={value}
                      onChange={onChange}
                      label={t(day)}
                    />
                  );
                }}
              />
              <Grid gap="0.5rem" cols="0.2fr 1fr" items="center">
                <p>From</p>
                <Controller
                  control={control}
                  name={`working_hours.${day}.from` as any}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TimeIconedInput
                        enabled={working_hours?.[day]?.enabled}
                        onChange={onChange}
                        errors={errors}
                        Icon={WiTime8}
                        value={value}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid gap="0.5rem" cols="0.2fr 1fr" items="center">
                <p>To</p>
                <Controller
                  control={control}
                  name={`working_hours.${day}.to` as any}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TimeIconedInput
                        value={value}
                        enabled={working_hours?.saturday?.enabled}
                        onChange={onChange}
                        errors={errors}
                        Icon={WiTime12}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </div>
        );
      })}
    </Container>
  );
};

export default BranchWorkingHours;

const Container = styled.div(
  ({ theme: { breakpoints, shadow } }) => `
 
  .box {
   
    
    border-radius: 6px;
    margin: 1rem 0 ;
    box-shadow:${shadow};
  }
  .table {
    padding: 1rem;    
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items:center;
  }
  ${up(breakpoints.md)}{
    .table {

        grid-template-columns: 1fr 0.5fr 0.5fr;
      }
  }
  `
);
