import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "../../reusable/Button";
import Heading from "../../StyledComponents/Heading";
import Flex from "../../StyledComponents/Flex";
import { up } from "../../../utils/themes";
import MagicRainbowButton from "../../reusable/FancyStuff/MagicRainbowButton";
import Spacer from "../../reusable/Spacer";
const SubscriptionSection = () => {
  return (
    <Container>
      <div className="current-sub">
        <div>
          <Heading tag="h4" color="primary" type="large-title">
            Onow Basic
          </Heading>

          <p className="desc">
            This is a trial version of Onow platform, feel free to discover all
            of our pages
          </p>
          <Flex items="center" margin="60px 0 0 0">
            <MagicRainbowButton>Upgrade Plan</MagicRainbowButton>
            {/* <Button color="primary" withTransition>
              Upgrade plan
            </Button> */}
            <Spacer size={10} />
            <Button color="primary" withTransition appearance="ghost">
              Discover plans
            </Button>
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
          <Button color="primary" withTransition appearance="ghost">
            Upgrade plan
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default SubscriptionSection;
const Container = styled.div(
  ({ theme: { breakpoints, font, shadow, subtleFloating } }) => `
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  .current-sub {
    padding: 1rem;
    display: grid;
    grid-template-columns: minmax(175px,2fr) minmax(125px, 1fr);
    box-shadow: ${shadow};
    border-radius: 6px;
    background-color: ${subtleFloating};
    
    .desc {
      font-weight: ${font.regular};
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
    background-color: ${subtleFloating};
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
  ${up(breakpoints.md)}{
    grid-template-columns: 1fr 0.5fr;
  }
  `
);
