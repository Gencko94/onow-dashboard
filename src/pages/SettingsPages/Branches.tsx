import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import BranchesList from "../../components/SettingsPage/StoreBranches/BranchesList";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import { useHistory } from "react-router-dom";
import Flex from "../../components/StyledComponents/Flex";
import { BiPlus } from "react-icons/bi";
import Button from "../../components/reusable/Button";

const Branches = () => {
  const history = useHistory();
  return (
    <div>
      <HeaderContainer>
        <Breadcrumbs
          children={[
            {
              name: { ar: "الإعدادات", en: "Settings" },
              target: "/settings",
            },
            {
              name: { ar: "فروع المتجر", en: "Store Branches" },
              target: "",
            },
          ]}
        />
        <Flex justify="flex-end">
          <Button
            padding="0.5rem"
            textSize="0.9rem"
            bg="green"
            Icon={BiPlus}
            iconSize={25}
            onClick={() => history.push("/settings/branches/create/branch")}
            withRipple
            withTransition
            type="submit"
          >
            Create new Branch
          </Button>
        </Flex>
      </HeaderContainer>

      <BranchesList />
    </div>
  );
};

export default Branches;
