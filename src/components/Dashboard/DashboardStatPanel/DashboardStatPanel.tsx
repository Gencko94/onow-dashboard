import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import Select from "react-select";
import { useMemo, useState } from "react";
const options = [
  {
    title: "Today",
    value: "today",
  },
  {
    title: "Yesterday",
    value: "yesterday",
  },
  {
    title: "Current Month",
    value: "currentmonth",
  },
  {
    title: "Last Month",
    value: "lastmonth",
  },
];
const DashboardStatPanel = () => {
  const [statsTime, setStatsTime] = useState(options[0]);
  const selectStyles = useMemo(() => {
    return {
      container: (provided: any, state: any) => ({
        ...provided,
        ht: "35px",
        width: "200px",
      }),
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
    };
  }, []);
  return (
    <Container>
      <div className="head-container">
        <Select
          options={options}
          value={statsTime}
          isSearchable={false}
          onChange={(value) => setStatsTime(value!)}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option.value}
          styles={selectStyles}
        />
      </div>
      <ContentContainer>
        <div className="stat-item">
          <Icon color="#da312c">
            <AiOutlineUser size={40} />
          </Icon>
          <div className="details">
            <p className="text">Users Online</p>
            <p className="value">2012</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#2cda66">
            <RiFileList3Line size={40} />
          </Icon>
          <div className="details">
            <p className="text">Total Orders</p>
            <p className="value">238</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#da312c">
            <MdAttachMoney size={40} />
          </Icon>
          <div className="details">
            <p className="text">Revenue</p>
            <p className="value">$3598</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#2c86da">
            <MdAttachMoney size={40} />
          </Icon>
          <div className="details">
            <p className="text">Revenue</p>
            <p className="value">$3598</p>
          </div>
        </div>
      </ContentContainer>
    </Container>
  );
};

export default DashboardStatPanel;
const Container = styled.div`
  .head-container {
    padding: 1rem 0;
  }
`;
const ContentContainer = styled.div(
  ({ theme: { breakpoints, boxColor, shadow, font, subHeading } }) => `

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  .stat-item {
    background-color: rgba(255,255,255,0.5);
   
    box-shadow:  0px -5px 25px -10px #e098447e;
    border-radius: 8px;
    flex: auto;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
  }
  .details {
    margin: 0 0.75rem;
    .text {
      text-align:center;
      font-size:0.9rem;
      white-space:nowrap;
      color: ${subHeading};
    }
    .value {
      text-align:center;
      font-size: 1.1rem;
      font-weight: ${font.xbold};
    }
  }
  @media ${breakpoints.md}{
    .details {
      .text {
        font-size:1.1rem;
      }
      .value {
        font-size:1.3rem;
      }
    }
  }
  @media ${breakpoints.lg}{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
);
const Icon = styled.span`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color};
  color: #fff;
  margin-bottom: 0.5rem;
`;
