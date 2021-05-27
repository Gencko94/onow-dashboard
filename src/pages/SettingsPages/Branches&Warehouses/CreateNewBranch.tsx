import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchInformation";
import { NEW_BRANCH } from "../../../interfaces/settings/branches-warehouses/branches-warehouses";

const CreateNewBranch = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<NEW_BRANCH>();
  const onSubmit = (data: NEW_BRANCH) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Branch"
        parentLabel="Branches & Warehouses"
        parentTarget="/branch-warehouse"
      />
      <BranchInformation
        errors={errors}
        register={register}
        control={control}
      />
    </div>
  );
};

export default CreateNewBranch;
