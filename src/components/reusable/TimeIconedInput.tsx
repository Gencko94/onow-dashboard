import { useState } from "react";

import ClickAwayListener from "react-click-away-listener";

import { useTranslation } from "react-i18next";

import { IconType } from "react-icons/lib";
import { CSSTransition } from "react-transition-group";

import styled, { css } from "styled-components";
import { up } from "../../constants";

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
  onChange: (...event: any[]) => void;
  Icon: IconType;
  required?: boolean;
  requiredMessage?: string;
  label?: string;
  value: any;
  enabled: boolean | undefined;
}

const TimeIconedInput = ({
  errors,
  value,
  Icon,
  onChange,
  required,
  label,
  requiredMessage,

  enabled,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [minutesPickerOpen, setMinutesPickerOpen] = useState(false);
  const [hour, setHour] = useState<string | null>(null);
  return (
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
  );
};

export default TimeIconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      primary,
      secondary,
      accent2,
      border,
      borderHovered,
      dangerRed,
      subtleBackground,
      text,
      borderDanger,
    },
    error,
    rtl,
  }) => `
  position: relative;
  label {
    color: ${text};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    display: block;
  }
  .input-container {
    position: relative;
    background-color: ${subtleBackground};
    color: ${text};
    border: ${error ? borderDanger : border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    input:disabled {
     background-color:${accent2};
     cursor:not-allowed;
    } 
    .icon {
      position:absolute;
      left:${rtl ? "" : 0};
      right:${rtl ? 0 : ""};
      padding: 0.4rem;
      height:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${primary};z
    }

    input {
      width:100%;
      flex: 1;
      padding: 0.4rem;
      padding-left:${rtl ? "0.4rem" : "35px"};
      padding-right:${rtl ? "35px" : "0.4rem"};
      font-size: 0.8rem; 
      color: ${text};
    }
    &:hover,
    &:focus-within {
      border-color: ${borderHovered};
    }
    
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${dangerRed};
  }
  ${up(breakpoints.md)}{
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    .input-container{
  
      input {
        font-size: 0.9rem;
      }
    }

  };
`
);
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
  background-color: ${(props) => props.theme.subtleFloating};

  .hour {
    border: ${(props) => props.theme.border};
    text-align: center;
    position: relative;
    cursor: pointer;
    transition: 75ms all ease;
    color: ${(props) => props.theme.text};
    &:hover {
      background-color: ${(props) => props.theme.primary};
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
  background-color: ${(props) => props.theme.subtleFloating};
  .minute {
    border: ${(props) => props.theme.border};
    text-align: center;
    color: ${(props) => props.theme.text};

    transition: 75ms all ease;
    &:hover {
      background-color: ${(props) => props.theme.primary};
      color: #fff;
    }
  }
`;
