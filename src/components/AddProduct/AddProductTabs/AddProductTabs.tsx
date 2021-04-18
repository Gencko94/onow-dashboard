import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface IProps {
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
}
const tabOptions = [
  'General Product Info',
  'Product Details',
  'Product Variations & Pricing',
  'Quantity Managment',
  'Additional Settings',
];
const AddProductTabs = ({ setActiveTab, activeTab }: IProps) => {
  return (
    <Container>
      {tabOptions.map((tab, i) => (
        <ListItem
          type="button"
          onClick={() => setActiveTab(i)}
          active={activeTab === i}
        >
          {tab}
        </ListItem>
      ))}
      <hr />
      <button type="submit">Submit</button>
    </Container>
  );
};

export default AddProductTabs;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  padding: 0.5rem;
  min-height: calc(100vh - 100px);
  border-radius: 5px;
`;
const ListContainer = styled.div``;
const ListItem = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 1rem;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 5px;
  background: ${props =>
    props.active && 'linear-gradient(90deg, #fe0488, #f78f21)'};
  color: ${props => (props.active ? '#fff' : props.theme.subHeading)};
  box-shadow: ${props => props.active && props.theme.shadow};
  font-weight: ${props => props.active && props.theme.font.bold};
  &:hover {
    color: ${props => !props.active && props.theme.headingColor};
  }
`;
