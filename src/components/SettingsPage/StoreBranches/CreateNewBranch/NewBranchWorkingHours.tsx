import { useContext, useMemo } from "react";
import {
  Control,
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { WiTime8, WiTime12 } from "react-icons/wi";

import styled from "styled-components";
import { WORKING_HOURS } from "../../../../interfaces/settings/branches-warehouses/branches-warehouses";
import { NewBranchContext } from "../../../../pages/SettingsPages/Branches/CreateNewBranch";
import CheckToggle from "../../../reusable/CheckToggle";

import TableHead from "../../../reusable/TableHead";
import TimeIconedInput from "../../../reusable/TimeIconedInput";

interface secondBranchFormProps {
  working_hours: WORKING_HOURS;
}

const NewBranchWorkingHours = () => {
  const { updateData, setActiveTab, formValues } = useContext(NewBranchContext);
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<secondBranchFormProps>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<secondBranchFormProps> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(watch());
  };
  const onError: SubmitErrorHandler<secondBranchFormProps> = (errors) => {
    console.log(errors);
  };

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
          <Controller
            control={control}
            name="working_hours.saturday.enabled"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckToggle
                  checked={value}
                  onChange={onChange}
                  label="Saturday"
                />
              );
            }}
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
          <Controller
            control={control}
            name="working_hours.sunday.enabled"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckToggle
                  checked={value}
                  onChange={onChange}
                  label="Sunday"
                />
              );
            }}
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
          <Controller
            control={control}
            name="working_hours.monday.enabled"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckToggle
                  checked={value}
                  onChange={onChange}
                  label="Monday"
                />
              );
            }}
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
          <Controller
            control={control}
            name="working_hours.tuesday.enabled"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckToggle
                  checked={value}
                  onChange={onChange}
                  label="Tuesday"
                />
              );
            }}
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

export default NewBranchWorkingHours;

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
