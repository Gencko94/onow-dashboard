import { useState } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Modal from "../../../Modal/Modal";
import Label from "../../../StyledComponents/Label";
import AddProductsModal from "./AddProductsModal";
interface IProps {
  control: Control<any>;
  watch: UseFormWatch<any>;
}
const ProductSelector = ({ watch, control }: IProps) => {
  const [open, setOpen] = useState(false);
  const products = watch("products");
  return (
    <Container>
      <Label>Select the Products</Label>
      <button onClick={() => setOpen(true)}>Click to Select</button>
      <Controller
        name="products"
        control={control}
        render={({ field: { ref, onChange, value } }) => (
          <CSSTransition
            in={open}
            unmountOnExit
            classNames="modal"
            timeout={150}
          >
            <Modal
              isOpen={open}
              title="Select Products"
              closeFunction={() => setOpen(false)}
            >
              <AddProductsModal
                onChange={onChange}
                closeFunction={() => setOpen(false)}
              />
            </Modal>
          </CSSTransition>
        )}
      />
    </Container>
  );
};

export default ProductSelector;
const Container = styled.div``;
