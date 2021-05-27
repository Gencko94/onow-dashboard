import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchInformation";
import {
  BRANCH,
  WAREHOUSE,
} from "../../../interfaces/settings/branches-warehouses/branches-warehouses";

const Warehouse = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<WAREHOUSE>();
  const onSubmit = (data: WAREHOUSE) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Warehouse"
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

export default Warehouse;
