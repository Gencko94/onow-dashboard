import { Dispatch, SetStateAction, useMemo, useState } from "react";

import ClickAwayListener from "react-click-away-listener";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";
import Select from "react-select";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { ORDERS_FILTERS } from "../../../../interfaces/orders/orders";
import format from "date-fns/format";
import { GrClose } from "react-icons/gr";

interface IProps {
  open: boolean;
  filters: ORDERS_FILTERS;
  setFilters: Dispatch<SetStateAction<ORDERS_FILTERS>>;
}
const orderStatusOptions = [
  {
    title: "Pending Approval",
    value: 1,
  },
  { title: "Under Processing", value: 2 },
  { title: "Out for Delivery", value: 3 },
  { title: "Delivered", value: 4 },
  { title: "Cancelled", value: 5 },
];
const paymentTypeOptions = [
  {
    title: "Cash",
    value: "cash",
  },
  { title: "Online", value: "online" },
];
const paymentStatusOptions = [
  {
    title: "Paid",
    value: 1,
  },
  { title: "Pending", value: 2 },
];
const orderModeOptions = [
  {
    title: "Delivery",
    value: "delivery",
  },
  { title: "Pickup", value: "pick" },
];
const OrdersFilters = ({ open, filters, setFilters }: IProps) => {
  const [fromCalendarOpen, setFromCalendarOpen] = useState(false);
  const [toCalendarOpen, setToCalendarOpen] = useState(false);
  const selectStyles = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        fontSize: "0.9rem",
        minHeight: "35px",
      }),
      indicatorContainer: (provided: any, state: any) => ({
        ...provided,
        padding: state.isFocused ? "0.4rem" : "0.4rem",
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
      menu: (provided: any) => ({
        ...provided,

        zIndex: 200,
      }),
    };
  }, []);
  return (
    <Container open={open}>
      <div className="title-container">
        <h6>Select the filters you wish to apply</h6>
      </div>
      <div className="filters">
        <div className="filter-container">
          <label>Order Status</label>
          <Select
            placeholder="Select Order Status..."
            isClearable
            styles={selectStyles}
            isSearchable={false}
            options={orderStatusOptions}
            value={orderStatusOptions.filter(
              (i) => filters.orderStatus === i.value
            )}
            onChange={(val) => {
              if (val) {
                setFilters((prev) => ({
                  ...prev,
                  orderStatus: val.value,
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  orderStatus: null,
                }));
              }
            }}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.value.toString()}
          />
        </div>
        <div className="filter-container">
          <label>Payment Type</label>
          <Select
            placeholder="Select Payment Type..."
            isClearable
            styles={selectStyles}
            isSearchable={false}
            options={paymentTypeOptions}
            value={paymentTypeOptions.filter(
              (i) => filters.paymentType === i.value
            )}
            onChange={(val) => {
              if (val) {
                setFilters((prev) => ({
                  ...prev,
                  paymentType: val.value as "cash" | "online",
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  paymentType: null,
                }));
              }
            }}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.value}
          />
        </div>
        <div className="filter-container">
          <label>Payment Status</label>
          <Select
            placeholder="Select Payment Status.."
            isClearable
            isSearchable={false}
            styles={selectStyles}
            options={paymentStatusOptions}
            value={paymentStatusOptions.filter(
              (i) => filters.paymentStatus === i.value
            )}
            onChange={(val) => {
              if (val) {
                setFilters((prev) => ({
                  ...prev,
                  paymentStatus: val.value,
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  paymentStatus: null,
                }));
              }
            }}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.value.toString()}
          />
        </div>
        <div className="filter-container">
          <label>Order Mode</label>
          <Select
            placeholder="Select Order Mode..."
            isClearable
            isSearchable={false}
            styles={selectStyles}
            options={orderModeOptions}
            value={orderModeOptions.filter(
              (i) => filters.orderMode === i.value
            )}
            onChange={(val) => {
              if (val) {
                setFilters((prev) => ({
                  ...prev,
                  orderMode: val.value as "delivery" | "pickup",
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  orderMode: null,
                }));
              }
            }}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.value}
          />
        </div>
        <div className="filter-container">
          <label>Order Amount Range</label>
          <div className="range-container">
            <div className="inputs-wrapper">
              <label>From</label>
              <input
                value={filters.orderAmount.from}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    orderAmount: {
                      ...prev.orderAmount,
                      from: parseInt(e.target.value),
                    },
                  }));
                }}
                type="number"
                min={0}
              />
            </div>
            <div className="inputs-wrapper">
              <label>To</label>
              <input
                value={filters.orderAmount.to}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    orderAmount: {
                      ...prev.orderAmount,
                      to: parseInt(e.target.value),
                    },
                  }));
                }}
                type="number"
                min={0}
              />
            </div>
          </div>
        </div>
        <div className="filter-container">
          <label>Order Date</label>
          <div className="range-container">
            <div className="inputs-wrapper">
              <label>From</label>
              <div className="iconed-input-container">
                <input
                  value={
                    filters.orderDate.from
                    // ? format(filters.orderDate.from as Date, "yyyy-MM-dd")
                    // : ""
                  }
                  readOnly
                />

                <button
                  type="button"
                  onClick={() => setFromCalendarOpen(true)}
                  className="icon"
                >
                  <FiCalendar />
                </button>
                <CSSTransition
                  in={fromCalendarOpen}
                  timeout={150}
                  classNames="calendar"
                  unmountOnExit
                >
                  <ClickAwayListener
                    onClickAway={() => setFromCalendarOpen(false)}
                  >
                    <div className="calendar-container">
                      {/* <Calendar
                        onChange={(date: Date | Date[]) => {
                          setFilters((prev) => ({
                            ...prev,
                            orderDate: {
                              ...prev.orderDate,
                              // from: date as Date,
                              from: format(date as Date, "yyyy-MM-dd"),
                            },
                          }));
                          setFromCalendarOpen(false);
                        }}
                        tileClassName="tile"
                        minDate={new Date()}
                        prev2Label={<FaAngleDoubleLeft size={20} />}
                        next2Label={<FaAngleDoubleRight size={20} />}
                        prevLabel={<FaAngleLeft size={20} />}
                        nextLabel={<FaAngleRight size={20} />}
                        showNeighboringMonth={false}
                      /> */}
                    </div>
                  </ClickAwayListener>
                </CSSTransition>
              </div>
            </div>
            <div className="inputs-wrapper">
              <label>To</label>
              <div className="iconed-input-container">
                <input
                  value={
                    filters.orderDate.to
                    // ? format(filters.orderDate.to as Date, "yyyy-MM-dd")
                    // : ""
                  }
                  readOnly
                />

                <button
                  type="button"
                  onClick={() => setToCalendarOpen(true)}
                  className="icon"
                >
                  <FiCalendar />
                </button>
                <CSSTransition
                  in={toCalendarOpen}
                  timeout={150}
                  classNames="calendar"
                  unmountOnExit
                >
                  <ClickAwayListener
                    onClickAway={() => setToCalendarOpen(false)}
                  >
                    <div className="calendar-container">
                      {/* <Calendar
                        onChange={(date: Date | Date[]) => {
                          setFilters((prev) => ({
                            ...prev,
                            orderDate: {
                              ...prev.orderDate,
                              // to: date as Date,
                              to: format(date as Date, "yyyy-MM-dd"),
                            },
                          }));
                          setToCalendarOpen(false);
                        }}
                        tileClassName="tile"
                        minDate={new Date()}
                        prev2Label={<FaAngleDoubleLeft size={20} />}
                        next2Label={<FaAngleDoubleRight size={20} />}
                        prevLabel={<FaAngleLeft size={20} />}
                        nextLabel={<FaAngleRight size={20} />}
                        showNeighboringMonth={false}
                      /> */}
                    </div>
                  </ClickAwayListener>
                </CSSTransition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ButtonsContainer>
        <button type="button" className="filter-btn">
          <span className="icon">
            <VscFilter size={20} />
          </span>
          <p>Filter Orders </p>
        </button>
        <button
          type="button"
          onClick={() =>
            setFilters({
              orderAmount: {
                from: "",
                to: "",
              },
              orderDate: {
                from: "",
                to: "",
              },
              orderMode: null,
              orderStatus: null,
              paymentStatus: null,
              paymentType: null,
            })
          }
          className="clear-btn"
        >
          <span className="icon">
            <GrClose size={18} />
          </span>
          <p>Clear </p>
        </button>
      </ButtonsContainer>
    </Container>
  );
};

export default OrdersFilters;
const Container = styled.div<{ open: boolean }>`
  background-color: ${(props) => props.theme.subtleFloating};

  border-radius: 6px;

  .title-container {
    padding: 0.75rem 0.75rem 0.25rem 0.75rem;
  }
  .filters {
    display: grid;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    label {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      display: inline-block;
    }
  }
  .range-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.8rem;
    }
    .inputs-wrapper {
      input {
        display: block;
        width: 100%;
        min-width: 0;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 0.4rem 0.5rem;
      }
    }
    .iconed-input-container {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      background-color: ${(props) => props.theme.subtleBackground};
      color: ${(props) => props.theme.text};
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      .icon {
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.textAlt};
      }
      input {
        display: block;
        width: 100%;
        min-width: 0;
        background-color: #fff;
        border-radius: 6px;
        padding: 0.4rem 0.5rem;
        /* font-size: 0.9rem; */
        border: none;
      }
      .calendar-container {
        position: absolute;
        z-index: 10;
        left: 0;
        bottom: 0px;
        direction: ltr;
        width: 250px;
        height: 250px;
      }
    }
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 6px;
    p {
      margin: 0 0.5rem;
      font-size: 0.9rem;
    }
    span.icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .filter-btn {
    color: #fff;
    background-color: ${(props) => props.theme.green};
  }
  .clear-btn {
  }
`;
