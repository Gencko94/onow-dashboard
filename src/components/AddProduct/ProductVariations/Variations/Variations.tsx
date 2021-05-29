import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import AddVariationModalBody from "../../../Modal/AddVariationModalBody";
import Modal from "../../../Modal/Modal";
import NoVariations from "./NoVariations";

const Variations = ({
  priceFromVariationsEnabled,
}: {
  priceFromVariationsEnabled: boolean;
}) => {
  const [newVariationModalOpen, setNewVariationModalOpen] = useState(false);
  const variations = [];
  return (
    <Container>
      {/* If No Variations Show this */}
      {variations.length === 0 && (
        <NoVariations setNewVariationModalOpen={setNewVariationModalOpen} />
      )}

      {/* New Variation Modal */}

      <Modal
        isOpen={newVariationModalOpen}
        title="Add Variation"
        closeFunction={() => setNewVariationModalOpen(false)}
      >
        <AddVariationModalBody
          priceFromVariationsEnabled={priceFromVariationsEnabled}
        />
      </Modal>
    </Container>
  );
};

export default Variations;
const Container = styled.div``;
const AddButton = styled.button`
  background-color: ${(props) => props.theme.green};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;
