import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchInformation";
import {
  NEW_BRANCH,
  NEW_WAREHOUSE,
} from "../../../interfaces/settings/branches-warehouses/branches-warehouses";

const CreateNewWarehouse = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<NEW_WAREHOUSE>();
  const onSubmit = (data: NEW_WAREHOUSE) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Warehouse"
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

export default CreateNewWarehouse;