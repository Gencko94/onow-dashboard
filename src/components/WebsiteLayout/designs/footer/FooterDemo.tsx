import { CSSProperties, lazy } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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
const FooterDemo = ({ data }: IProps) => {
  const { control } = useFormContext<FOOTER_DESIGN>();
  const containerBgColor = useWatch({
    control: control,
    name: 'styles.backgroundColor',
  });
  const textColor = useWatch({
    control: control,
    name: 'styles.textColor',
  });
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
      style={
        { '--bg': containerBgColor, '--textColor': textColor } as CSSProperties
      }
    >
      {renderFooterComponents(data)}
    </Container>
  );
};

export default FooterDemo;
const Container = styled.div`
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  background-color: var(--bg);
  color: var(--textColor);
`;
