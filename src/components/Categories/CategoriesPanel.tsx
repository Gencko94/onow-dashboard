import { BiPlus } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useHistory } from "react-router-dom";
import Button from "../reusable/Button";
import IconWrapper from "../reusable/Icon";
import Flex from "../StyledComponents/Flex";
import Heading from "../StyledComponents/Heading";

const CategoriesPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="space-between" items="center" margin="1rem 0">
      <Heading tag="h2" type="large-title">
        Categories
      </Heading>
      <Button
        onClick={() => history.push("/categories/category/create")}
        color="green"
        withTransition
        size="md"
      >
        <IconWrapper Icon={IoMdAdd} />
        Create New Category
      </Button>
      {/* <ProductsPanelActions /> */}
    </Flex>
  );
};

export default CategoriesPanel;
