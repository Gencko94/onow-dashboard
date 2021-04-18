import { Dispatch, SetStateAction } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';

interface IProps {
  setNewVariationModalOpen: Dispatch<SetStateAction<boolean>>;
}
const NoVariations = ({ setNewVariationModalOpen }: IProps) => {
  return (
    <Container>
      <NoVariationsText>No Variations Added </NoVariationsText>
      <AddButton
        type="button"
        onClick={() => {
          setNewVariationModalOpen(true);
        }}
      >
        <Icon>
          <BiPlus size={20} />
        </Icon>
        <BtnText>Add New Variation</BtnText>
      </AddButton>
    </Container>
  );
};

export default NoVariations;
const Container = styled.div`
  height: calc(100vh - 480px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: ${props => props.theme.border};
  border-radius: 6px;
  background-color: ${props => props.theme.overlayColor};
`;
const NoVariationsText = styled.h6`
  margin-bottom: 1rem;
`;
const AddButton = styled.button`
  background-color: ${props => props.theme.green};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.5rem 0.75rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  margin: 0 0.5rem;
`;
