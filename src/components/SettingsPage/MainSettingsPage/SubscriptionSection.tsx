import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "../../reusable/Button";
import Heading from "../../StyledComponents/Heading";
import Flex from "../../StyledComponents/Flex";
const SubscriptionSection = () => {
  return (
    <Container>
      <div className="current-sub">
        <div>
          <Heading tag="h4" color="primary" mb="0.75rem">
            Onow Basic
          </Heading>

          <p className="desc">
            This is a trial version of Onow platform, feel free to discover all
            of our pages
          </p>
          <Flex items="center" margin="60px 0 0 0">
            <Button
              text="Upgrade Plan"
              bg="linear-gradient(90deg, #fe0488, #f78f21)"
              padding="0.5rem"
              color="#fff"
              withRipple
              withTransition
              textSize="0.9rem"
            />
            <Button
              text="Discover Plans"
              bg="transparent"
              padding="0.5rem"
              color="primary"
              margin="0 0.5rem"
              border
              withTransition
              textSize="0.9rem"
            />
          </Flex>
        </div>
        <div className="img" />
      </div>
      <div className="sub-count">
        <div className="circle-container">
          <div className="circle">
            <CircularProgressbar
              value={42}
              maxValue={100}
              text={`${42} Days Left`}
              styles={buildStyles({
                pathColor: "#f78f21",
                textSize: "0.9rem",
                textColor: "#f78f21",
              })}
              strokeWidth={6}
            />
          </div>
        </div>
        <Flex items="center" justify="center" margin="40px 0 0 0">
          <Button
            text="Upgrade Plan"
            bg="linear-gradient(90deg, #fe0488, #f78f21)"
            padding="0.5rem"
            color="#fff"
            withRipple
            textSize="0.9rem"
            withTransition
          />
        </Flex>
      </div>
    </Container>
  );
};

export default SubscriptionSection;
const Container = styled.div(
  ({ theme: { breakpoints, font, shadow } }) => `
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  .current-sub {
    padding: 1rem;
    display: grid;
    grid-template-columns: minmax(175px,2fr) minmax(125px, 1fr);
    box-shadow: ${shadow};
    border-radius: 6px;
    background-color: #fff;
    
    .desc {
      font-weight: ${font.light};
      font-size: 0.8rem;
    }
    .img {
      background-image: url("/images/sub.svg");
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      min-width: 100%;
      background-position: 50%;
    }
  }
  .sub-count {
    padding: 1rem;
    box-shadow: ${shadow};
    border-radius: 6px;
    background-color: #fff;
    .circle-container {
      display: flex;
      align-items: center;
      justify-content: center;
      .circle {
        width: 100px;
        max-height: 100px;
      }
    }
  }
  @media ${breakpoints.md}{
    grid-template-columns: 1fr 0.5fr;
  }
  `
);
