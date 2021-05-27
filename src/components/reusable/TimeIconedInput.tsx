import { useState } from "react";
import Calendar from "react-calendar";
import ClickAwayListener from "react-click-away-listener";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-calendar/dist/Calendar.css";

import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { CSSTransition } from "react-transition-group";

import styled, { css } from "styled-components";
import { format } from "date-fns";
const hours = [
  "12:00 PM",
  "13:00 PM",
  "14:00 PM",
  "15:00 PM",
  "16:00 PM",
  "17:00 PM",
  "18:00 PM",
  "19:00 PM",
  "20:00 PM",
  "21:00 PM",
  "22:00 PM",
  "23:00 PM",
  "00:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
];
const minutes = [
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
interface IProps {
  errors: any;
  name: string;
  Icon: IconType;
  required?: boolean;
  requiredMessage?: string;
  label: string;
  control: Control<any>;
}

const TimeIconedInput = ({
  errors,

  Icon,
  name,
  required,
  label,
  requiredMessage,
  control,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={format(new Date(), "dd-MM-yyyy")}
      render={({ field: { onChange, value } }) => (
        <Container
          onClick={() => setTimePickerOpen(true)}
          rtl={language === "ar"}
          error={Boolean(errors?.[name])}
        >
          <label>{label}</label>
          <div className="input-container">
            <span className="icon">
              <Icon size={21} />
            </span>
            <input
              readOnly
              defaultValue={format(new Date(), "dd-MM-yyyy")}
              value={value}
            />
          </div>
          <CSSTransition
            in={timePickerOpen}
            timeout={150}
            classNames="calendar"
            unmountOnExit
          >
            <ClickAwayListener onClickAway={() => setTimePickerOpen(false)}>
              <HoursContainer></HoursContainer>
            </ClickAwayListener>
          </CSSTransition>
          <p className="error">{errors?.message}</p>
        </Container>
      )}
    />
  );
};

export default TimeIconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  position: relative;
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.subHeading};
      background-color: ${(props) => props.theme.inputColorLight};
      border-right: ${(props) => props.theme.border};
      ${(props) =>
        props.rtl &&
        css`
          border-right: none;
          border-left: ${(props) => props.theme.border};
        `}
    }

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
      width: 50px;
    }
    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
      background-color: ${(props) => props.theme.inputColorLight};
    }
    ${(props) =>
      props.error &&
      css`
        border-color: ${(props) => props.theme.dangerRed} !important;
      `}
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.dangerRed};
  }
`;
const HoursContainer = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0px;
  direction: ltr;
  width: 250px;
  height: 250px;
`;
