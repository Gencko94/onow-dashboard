import styled from 'styled-components';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { useState } from 'react';
import Variations from './Variations/Variations';
const ProductVariations = () => {
  const [enableVariations, setEnableVariations] = useState(false);
  return (
    <Container>
      <ToggleContainer>
        <Toggle
          id="enable-variations"
          checked={enableVariations}
          onChange={() => setEnableVariations(!enableVariations)}
        />
        <ToggleLabel htmlFor="enable-variations">
          Enable Product Variations
        </ToggleLabel>
      </ToggleContainer>

      {enableVariations && <Variations />}
    </Container>
  );
};

export default ProductVariations;

const Container = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 0.5rem;
  border-radius: 5px;
  min-height: calc(100vh - 100px);
`;
const ToggleContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
`;
const ToggleLabel = styled.label`
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;
