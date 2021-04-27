import { lazy } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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
const HeaderDemo = ({ data }: IProps) => {
  const { control } = useFormContext<HEADER_DESIGN>();
  const categoryBarEnabled = useWatch({
    control: control,
    name: 'categoryBar.enabled',
  });
  const categoryBarBackgroundColor = useWatch({
    control: control,
    name: 'categoryBar.styles.backgroundColor',
  });
  const categoryBarTextColor = useWatch({
    control: control,
    name: 'categoryBar.styles.textColor',
  });
  const categories = useWatch({
    control: control,
    name: 'categoryBar.categories',
  });

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
      {categoryBarEnabled === true && (
        <CategoryBar
          backgroundColor={categoryBarBackgroundColor}
          textColor={categoryBarTextColor}
          categories={categories}
        />
      )}
    </>
  );
};

export default HeaderDemo;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;
