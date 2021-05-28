import { useState } from "react";
import Calendar from "react-calendar";
import ClickAwayListener from "react-click-away-listener";
import { Control, Controller, FieldError } from "react-hook-form";
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

interface BaseInput {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError;
  /**
   * 	Input's name being registered.
   */
  name: string;
  /**
   * 	The icon to show.
   */
  Icon: IconType;
  /**
   * 	The label of the input.
   */
  label: string;
  /**
   * 	```control``` object provided by ```useForm```.
   */
  control: Control<any>;
}

interface RequiredInput extends BaseInput {
  /**
   * 	Optional. Marks the input as ```required```.
   */
  required: boolean;
  /**
   * The Message text to show when the field is ```required```.
   *
   * Required when ```required``` is provided.
   */
  requiredMessage: string;
}
interface NotRequiredInput extends BaseInput {
  /**
   * 	Optional. Marks the input as ```required```.
   */
  required?: never;
  /**
   * The Message text to show when the field is ```required```.
   *
   * Required when ```required``` is provided.
   */
  requiredMessage?: never;
}
type IProps = RequiredInput | NotRequiredInput;
const DateIconedInput = ({
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={format(new Date(), "dd-MM-yyyy")}
      render={({ field: { onChange, value } }) => (
        <Container
          onClick={() => setCalendarOpen(true)}
          rtl={language === "ar"}
          error={Boolean(errors)}
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
            in={calendarOpen}
            timeout={150}
            classNames="calendar"
            unmountOnExit
          >
            <ClickAwayListener onClickAway={() => setCalendarOpen(false)}>
              <CalendarContainer>
                <Calendar
                  value={new Date()}
                  onChange={(date: Date | Date[]) => {
                    setCalendarOpen(false);

                    onChange(format(date as Date, "dd-MM-yyyy"));
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
      )}
    />
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
const CalendarContainer = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0px;
  direction: ltr;
  width: 250px;
  height: 250px;
`;
