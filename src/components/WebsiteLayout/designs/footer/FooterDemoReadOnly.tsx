import { lazy } from 'react';
import styled from 'styled-components';
import { FOOTER_DESIGN } from '../../../../interfaces/website-layout/designs/footer-design';

const LogoDemo = lazy(() => import('../header/components/LogoDemo'));
const FooterContactForm = lazy(() => import('./components/FooterContactForm'));
const FooterNavigationLinks = lazy(
  () => import('./components/FooterNavigationLinks')
);
const FooterOfficeLocation = lazy(
  () => import('./components/FooterOfficeLocation')
);
interface IProps {
  data: FOOTER_DESIGN;
}

const FooterDemoReadOnly = ({ data }: IProps) => {
  const renderFooterComponents = (data: FOOTER_DESIGN) => {
    let arr: JSX.Element[] = [];
    data.order.forEach(order => {
      if (order === 'logo') {
        arr.push(<LogoDemo />);
      } else if (order === 'contact-form') {
        arr.push(<FooterContactForm />);
      } else if (order === 'office-location') {
        arr.push(<FooterOfficeLocation />);
      } else if (order === 'nav-links') {
        arr.push(<FooterNavigationLinks />);
      }
    });
    return arr;
  };
  return (
    <Container
      bg={data.styles.backgroundColor}
      textColor={data.styles.textColor}
    >
      {renderFooterComponents(data)}
    </Container>
  );
};

export default FooterDemoReadOnly;
const Container = styled.div<{ bg: string; textColor: string }>`
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  background-color: ${props => props.bg};
  color: ${props => props.textColor};
`;
