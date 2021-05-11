import styled from 'styled-components';
import AccountSection from '../../components/SettingsPage/MainSettingsPage/AccountSection';
import StoreSection from '../../components/SettingsPage/MainSettingsPage/StoreSection';
import SubscriptionSection from '../../components/SettingsPage/MainSettingsPage/SubscriptionSection';

const Settings = () => {
  return (
    <Container>
      <SubscriptionSection />
      <AccountSection />
      <StoreSection />
    </Container>
  );
};

export default Settings;
const Container = styled.div`
  padding: 0.75rem;
`;
