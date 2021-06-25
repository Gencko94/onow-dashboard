import { BiPlus } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../reusable/Button";
import Flex from "../StyledComponents/Flex";

const CategoriesPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="flex-end" items="center" padding="0.75rem">
      <Button
        onClick={() => history.push("/categories/create")}
        bg="green"
        padding="0.25rem"
        textSize="0.9rem"
        text="Create New Category"
        withRipple
        withTransition
        Icon={BiPlus}
      />
      {/* <ProductsPanelActions /> */}
    </Flex>
  );
};

export default CategoriesPanel;
