import { useState } from "react";
import Calendar from "react-calendar";
import ClickAwayListener from "react-click-away-listener";
import { Control, Controller, FieldError, RefCallBack } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-calendar/dist/Calendar.css";
import { formatISO, parseISO } from "date-fns";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

import styled, { css } from "styled-components";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

interface IProps {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;

  /**
   * 	The label of the input.
   */
  label: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;
  ref?: RefCallBack;
  onChange: (...event: any[]) => void;
  value: any;
}

const DateIconedInput = ({
  errors,
  disabled,
  onChange,
  value,
  label,

  desc,
  ref,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <Container
      onClick={() => {
        if (!disabled) setCalendarOpen(true);
      }}
      rtl={language === "ar"}
      error={Boolean(errors)}
    >
      <label>{label}</label>
      <div className="input-container">
        <span className="icon">
          <FiCalendar size={21} />
        </span>
        <input
          ref={ref}
          readOnly
          defaultValue={format(
            parseISO(new Date().toISOString()),
            "dd-MM-yyyy"
          )}
          value={format(parseISO(value), "dd-MM-yyyy")}
          disabled={disabled}
        />
      </div>
      {desc && <p className="desc">{desc}</p>}
      <CSSTransition
        in={calendarOpen}
        timeout={150}
        classNames="calendar"
        unmountOnExit
      >
        <ClickAwayListener onClickAway={() => setCalendarOpen(false)}>
          <CalendarContainer>
            <Calendar
              value={parseISO(value)}
              onChange={(date: any) => {
                console.log(value, "value");
                console.log(date.toISOString());
                setCalendarOpen(false);

                onChange(date.toISOString());
              }}
              tileClassName="tile"
              minDate={new Date()}
              prev2Label={<FaAngleDoubleLeft size={20} />}
              next2Label={<FaAngleDoubleRight size={20} />}
              prevLabel={<FaAngleLeft size={20} />}
              nextLabel={<FaAngleRight size={20} />}
              showNeighboringMonth={false}
            />
          </CalendarContainer>
        </ClickAwayListener>
      </CSSTransition>
      <p className="error">{errors?.message}</p>
    </Container>
  );
};

export default DateIconedInput;
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
      color: ${(props) => props.theme.mainColor};
    }

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
      width: 50px;
      &:disabled {
        background-color: ${(props) => props.theme.accent2};
      }
    }
    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
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
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.mainColor};
  }
`;
const CalendarContainer = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0px;
  direction: ltr;
  width: 250px;
  height: 250px;
`;
