import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const SubscriptionSection = () => {
  return (
    <Container>
      <div className="current-sub">
        <div>
          <h4>Onow Basic</h4>
          <p>
            This is a trial version of Onow platform, feel free to discover all
            of our pages
          </p>
          <div className="buttons-container">
            <button className="upgrade">Upgrade Plan</button>
            <button className="other-plans">Discover Plans </button>
          </div>
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
                pathColor: '#f78f21',
                textSize: '0.9rem',
                textColor: '#f78f21',
              })}
              strokeWidth={6}
            />
          </div>
        </div>
        <div className="buttons-container">
          <button className="upgrade">Upgrade Plan</button>
        </div>
      </div>
    </Container>
  );
};

export default SubscriptionSection;
const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 0.5fr;
  .current-sub {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr minmax(232px, 1fr);
    box-shadow: ${props => props.theme.shadow};
    border-radius: 6px;
    background-color: #fff;
    h4 {
      color: ${props => props.theme.mainColor};
      margin-bottom: 0.75rem;
    }
    p {
      font-weight: ${props => props.theme.font.light};
      font-size: 0.8rem;
    }
    .img {
      background-image: url('/images/sub.svg');
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      min-width: 100%;
      background-position: 50%;
    }
    .buttons-container {
      margin-top: 60px;
      display: flex;
      align-items: center;
      button {
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: ${props => props.theme.font.semibold};
        box-shadow: ${props => props.theme.shadow};
        transition: background 200ms ease;
      }
      .upgrade {
        background: ${props => props.theme.mainGradient};
        color: #fff;
      }
      .other-plans {
        color: ${props => props.theme.mainColor};
        border: ${props => props.theme.border};
        margin: 0 0.5rem;

        &:hover {
          background-color: ${props => props.theme.mainColor};
          color: #fff;
        }
      }
    }
  }
  .sub-count {
    padding: 1rem;
    box-shadow: ${props => props.theme.shadow};
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
    .buttons-container {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: ${props => props.theme.font.semibold};
        box-shadow: ${props => props.theme.shadow};
        transition: background 200ms ease;
      }
      .upgrade {
        background: ${props => props.theme.mainGradient};
        color: #fff;
      }
    }
  }
`;
