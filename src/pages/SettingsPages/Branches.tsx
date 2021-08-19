import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import BranchesList from "../../components/SettingsPage/StoreBranches/BranchesList";
import { useHistory } from "react-router-dom";
import Flex from "../../components/StyledComponents/Flex";

import Button from "../../components/reusable/Button";
import Heading from "../../components/StyledComponents/Heading";
import Spacer from "../../components/reusable/Spacer";

const Branches = () => {
  const history = useHistory();
  return (
    <div>
      <Flex items="center" justify="space-between">
        <div>
          <Heading tag="h2" type="large-title">
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
      <Spacer size={40} />
      <BranchesList />
    </div>
  );
};

export default Branches;
