import { FcSettings, FcLock, FcPositiveDynamic } from 'react-icons/fc';
import styled from 'styled-components';
import SettingsCard from '../../reusable/SettingsCard';

const AccountSection = () => {
  return (
    <Container>
      <h5>Account Settings</h5>
      <div className="cards-container">
        <SettingsCard
          title="Profile Settings"
          target="/settings/account"
          Icon={FcSettings}
          desc="Preview & Edit Profile Information"
        />
        <SettingsCard
          title="Password"
          target="/settings/password"
          Icon={FcLock}
          desc="Change your password"
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

  .cards-container {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
`;
