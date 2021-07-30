import { BiPlus } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import Button from "../reusable/Button";
import Flex from "../StyledComponents/Flex";
import Heading from "../StyledComponents/Heading";

const CategoriesPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="space-between" items="center" margin="1rem 0">
      <Heading tag="h2" weight="bold">
        Categories
      </Heading>
      <Button
        onClick={() => history.push("/categories/category/create")}
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
