import styled from "styled-components";
import { RiFileList3Line } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import Select from "react-select";
import { useMemo, useState } from "react";
import Heading from "../../StyledComponents/Heading";
import Grid from "../../StyledComponents/Grid";
import Flex from "../../StyledComponents/Flex";
import Paragraph from "../../StyledComponents/Paragraph";
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
      <Grid columns="repeat(auto-fit,minmax(250px,1fr))" gap="1rem">
        <Card>
          <Grid padding="0.5rem" columns="1fr 0.8fr" items="center" gap="1rem">
            <Flex items="center" justify="flex-start" padding="0.5rem">
              <Icon color="#2cda66">
                <RiFileList3Line size={30} />
              </Icon>
              <Paragraph fontSize="0.9rem" margin="0 0.5rem" weight="semibold">
                Total Orders
              </Paragraph>
            </Flex>
            <Heading tag="h3">238</Heading>
          </Grid>
        </Card>
        <Card>
          <Grid padding="0.5rem" columns="1fr 0.8fr" items="center" gap="1rem">
            <Flex items="center" justify="flex-start" padding="0.5rem">
              <Icon color="#2cda66">
                <MdAttachMoney size={30} />
              </Icon>
              <Paragraph fontSize="0.9rem" margin="0 0.5rem" weight="semibold">
                Average Order Cost
              </Paragraph>
            </Flex>
            <Heading tag="h3">10.39 KD</Heading>
          </Grid>
        </Card>
        <Card>
          <Grid padding="0.5rem" columns="1fr 0.8fr" items="center" gap="1rem">
            <Flex items="center" justify="flex-start" padding="0.5rem">
              <Icon color="#2cda66">
                <RiFileList3Line size={30} />
              </Icon>
              <Paragraph fontSize="0.9rem" margin="0 0.5rem" weight="semibold">
                Revenue
              </Paragraph>
            </Flex>
            <Heading tag="h3">2682.2 KD</Heading>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default DashboardStatPanel;
const Container = styled.div`
  .head-container {
    padding: 1rem 0;
  }
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.subtleBackground};

  border-radius: 10px;
  position: relative;
  /* z-index: 1; */
`;

const Icon = styled.span`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color};
  color: #fff;
`;
