import { format, parseISO } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import styled from "styled-components";
import { CUSTOMER } from "../../interfaces/customers/customers";
import Box from "../reusable/Box/Box";
import Spacer from "../reusable/Spacer";
import Flex from "../StyledComponents/Flex";
import Grid from "../StyledComponents/Grid";
import Heading from "../StyledComponents/Heading";
import Paragraph from "../StyledComponents/Paragraph";

interface IProps {
  data: CUSTOMER;
}

const CustomerInsights = ({ data }: IProps) => {
  return (
    <Box
      style={{ alignSelf: "start" }}
      type="titled"
      boxTitle="Customer Insights"
    >
      <Wrapper>
        <Grid cols="1fr 0.8fr" items="center" gap="1rem">
          <Flex items="center" justify="flex-start">
            <Icon color="#2cda66">
              <FiCalendar size={20} />
            </Icon>
            <Spacer size={10} />
            <Paragraph fontSize="0.9rem" weight="semibold">
              Join Date
            </Paragraph>
          </Flex>
          <Paragraph fontSize="1rem" margin="0 0.5rem" weight="semibold">
            {format(parseISO(data.join_date), "dd-MM-yyyy")}
          </Paragraph>
        </Grid>
        <Spacer size={10} />
        <Grid cols="1fr 0.8fr" items="center" gap="1rem">
          <Flex items="center" justify="flex-start">
            <Icon color="#2cda66">
              <FiCalendar size={20} />
            </Icon>
            <Spacer size={10} />
            <Paragraph fontSize="0.9rem" weight="semibold">
              Last Order Date
            </Paragraph>
          </Flex>
          <Paragraph fontSize="1rem" margin="0 0.5rem" weight="semibold">
            {format(parseISO(data.join_date), "dd-MM-yyyy")}
          </Paragraph>
        </Grid>
      </Wrapper>
      <Spacer size={10} />
    </Box>
  );
};

export default CustomerInsights;
const Icon = styled.span`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color};
  color: #fff;
`;
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.subtleBackground};
  padding: 1rem;
  border-radius: 10px;
  position: relative;
  z-index: 1;
`;
