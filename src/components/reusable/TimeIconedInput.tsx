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
import { setConstantValue } from "typescript";
const hours = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
];
const minutes = [
  "00",
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
  label?: string;
  control: Control<any>;
  enabled: boolean;
}

const TimeIconedInput = ({
  errors,

  Icon,
  name,
  required,
  label,
  requiredMessage,
  control,
  enabled,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [minutesPickerOpen, setMinutesPickerOpen] = useState(false);
  const [hour, setHour] = useState<string | null>(null);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={format(new Date(), "dd-MM-yyyy")}
      render={({ field: { onChange, value, ref } }) => (
        <Container
          onClick={() => {
            if (enabled) setTimePickerOpen(true);
          }}
          rtl={language === "ar"}
          error={Boolean(errors?.message)}
        >
          {label && <label>{label}</label>}
          <div className="input-container">
            <span className="icon">
              <Icon size={21} />
            </span>
            <input
              ref={ref}
              disabled={!enabled}
              readOnly
              // defaultValue={format(new Date(), "dd-MM-yyyy")}
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
              <HoursContainer>
                {hours.map((h) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimePickerOpen(false);
                      setMinutesPickerOpen(true);
                      setHour(h);
                    }}
                    key={h}
                    className="hour"
                  >
                    {h}
                  </button>
                ))}
              </HoursContainer>
            </ClickAwayListener>
          </CSSTransition>
          <CSSTransition
            in={minutesPickerOpen}
            timeout={150}
            classNames="calendar"
            unmountOnExit
          >
            <ClickAwayListener onClickAway={() => setMinutesPickerOpen(false)}>
              <MinutesContainer>
                {minutes.map((m) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMinutesPickerOpen(false);
                      onChange(`${hour?.slice(0, 2)}:${m}`);
                    }}
                    key={m}
                    className="minute"
                  >
                    {`${hour?.slice(0, 2)}:${m}`}
                  </button>
                ))}
              </MinutesContainer>
            </ClickAwayListener>
          </CSSTransition>
          {errors?.message && <p className="error">{errors?.message}</p>}
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
  left: 5px;
  bottom: 25px;
  direction: ltr;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 250px;
  height: 200px;
  font-size: 0.8rem;
  background-color: #f1f1f1;

  .hour {
    border: ${(props) => props.theme.border};
    text-align: center;
    position: relative;
    cursor: pointer;
    transition: 75ms all ease;
    transition: 75ms all ease;
    &:hover {
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
    }
  }
`;
const MinutesContainer = styled.div`
  position: absolute;
  z-index: 101;
  left: 5px;
  bottom: 25px;
  direction: ltr;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 200px;
  height: 100px;
  font-size: 0.8rem;
  background-color: #f1f1f1;
  .minute {
    border: ${(props) => props.theme.border};
    text-align: center;

    transition: 75ms all ease;
    &:hover {
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
    }
  }
`;
