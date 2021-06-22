import { FcSettings, FcLock, FcPositiveDynamic } from "react-icons/fc";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";

const AccountSection = () => {
  return (
    <Container>
      <h5 className="title">Account Settings</h5>
      <div className="cards-container">
        <SettingsCard
          title="Account Settings"
          target="/settings/account-settings"
          Icon={FcSettings}
          desc="Preview & Edit Account Information"
        />

        <SettingsCard
          title="Subscription"
          target="/settings/subscription"
          Icon={FcPositiveDynamic}
          desc="Manage your subscription at O-Now "
        />
      </div>
    </Container>
  );
};

export default AccountSection;
const Container = styled.div`
  margin: 2rem 0;
  .title {
    color: ${(props) => props.theme.mainColor};
  }
  .cards-container {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
`;
