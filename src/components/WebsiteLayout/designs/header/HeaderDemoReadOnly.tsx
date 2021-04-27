import { lazy } from 'react';
import styled from 'styled-components';
import {
  HEADER_DESIGN,
  HEADER_MAIN,
} from '../../../../interfaces/website-layout/designs/header-design';

const CategoryBar = lazy(() => import('./components/CategoryBar'));
const LogoDemo = lazy(() => import('./components/LogoDemo'));
const SearchBarDemo = lazy(() => import('./components/SearchBarDemo'));
interface IProps {
  data: HEADER_DESIGN;
}
const HeaderDemoReadOnly = ({ data }: IProps) => {
  const renderMainOrder = (main: HEADER_MAIN | undefined) => {
    let arr: JSX.Element[] = [];
    main?.order.forEach(order => {
      if (order === 'logo') {
        arr.push(<LogoDemo />);
      } else if (order === 'search') {
        arr.push(<SearchBarDemo />);
      }
    });
    return arr;
  };

  return (
    <>
      <MainContainer>{renderMainOrder(data?.main)}</MainContainer>
      {data?.categoryBar.enabled && (
        <CategoryBar
          backgroundColor={data?.categoryBar.styles.backgroundColor}
          textColor={data?.categoryBar.styles.textColor}
          categories={data?.categoryBar.categories}
        />
      )}
    </>
  );
};

export default HeaderDemoReadOnly;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;
