import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import BranchesList from "../../components/SettingsPage/StoreBranches/BranchesList";
import { useHistory } from "react-router-dom";
import Flex from "../../components/StyledComponents/Flex";
import { BiPlus } from "react-icons/bi";
import Button from "../../components/reusable/Button";
import Heading from "../../components/StyledComponents/Heading";

const Branches = () => {
  const history = useHistory();
  return (
    <div>
      <Flex items="center" justify="space-between">
        <div>
          <Heading tag="h2" weight="bold" margin="1rem 0">
            Branches
          </Heading>
          <Breadcrumbs
            withoutTitle
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
        </div>
        <Flex justify="flex-end">
          <Button
            color="green"
            onClick={() => history.push("/settings/branches/create/branch")}
            withTransition
            type="submit"
          >
            Create new Branch
          </Button>
        </Flex>
      </Flex>

      <BranchesList />
    </div>
  );
};

export default Branches;
