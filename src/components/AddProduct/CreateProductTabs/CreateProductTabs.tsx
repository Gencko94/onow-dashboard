import { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import SaveButton from "../../reusable/SaveButton";

interface IProps {}
const tabOptions = [
  "General Product Info",
  "Product Details",
  "Product Variations & Pricing",
  "Ordering Options",
  "Additional Settings",
];
const CreateProductTabs = () => {
  const { activeTab, setActiveTab, formValues } = useContext(NewProductContext);
  return (
    <Container>
      <TabItem
        type="button"
        // onClick={() => setActiveTab?.(0)}
        active={activeTab === 0}
      >
        General Product Info
      </TabItem>

      <TabItem
        type="button"
        // onClick={() => setActiveTab?.(1)}
        active={activeTab === 1}
      >
        Pricing & Variations
      </TabItem>
      <TabItem
        type="button"
        // onClick={() => setActiveTab?.(2)}
        active={activeTab === 2}
      >
        Ordering Options & Branch Availability
      </TabItem>

      <div className="submit">
        <SaveButton
          type="submit"
          onClick={() => {
            if (activeTab === 2) {
              console.log(formValues);
            } else if (activeTab === 1) {
              setActiveTab?.(2);
            } else if (activeTab === 0) {
              setActiveTab?.(1);
            }
          }}
          title={activeTab === 2 ? "Save Changes" : "Next"}
        />
      </div>
    </Container>
  );
};

export default CreateProductTabs;
const Container = styled.div`
  padding-top: 0.5rem;

  border-radius: 5px;

  display: flex;
  gap: 0.5rem;
  .submit {
    display: block;
    margin-left: auto;
  }
`;

const TabItem = styled.button<{ active?: boolean }>`
  padding: 0.75rem;
  transition: color 150ms ease;
  font-size: 0.9rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background-color: #fff;

  color: ${(props) =>
    props.active ? props.theme.mainColor : props.theme.subHeading};

  font-weight: ${(props) => props.active && props.theme.font.bold};
  &:hover {
    color: ${(props) => !props.active && props.theme.headingColor};
  }
`;
