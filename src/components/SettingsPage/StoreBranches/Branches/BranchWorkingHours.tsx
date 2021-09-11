import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { WiTime8, WiTime12 } from "react-icons/wi";

import Box from "../../../reusable/Box/Box";

import GithubInput from "../../../reusable/Inputs/GithubInput";

import TimeIconedInput from "../../../reusable/TimeIconedInput";

import Grid from "../../../StyledComponents/Grid";
import Paragraph from "../../../StyledComponents/Paragraph";

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
    <Box type="titled" boxTitle="Branch working hours">
      {days.map((day) => {
        return (
          <Grid
            key={day}
            columns="repeat(auto-fit,minmax(250px,1fr))"
            gap="1rem"
            padding="1rem"
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
            <Grid gap="0.5rem" columns="0.2fr 1fr" items="center">
              <Paragraph>From</Paragraph>
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
            <Grid gap="0.5rem" columns="0.2fr 1fr" items="center">
              <Paragraph>To</Paragraph>
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
        );
      })}
    </Box>
  );
};

export default BranchWorkingHours;
