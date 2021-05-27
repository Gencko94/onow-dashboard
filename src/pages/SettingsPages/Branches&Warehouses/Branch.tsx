import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchLocation";
import BranchWorkingHours from "../../../components/SettingsPage/Branches&Warehouses/Branches/BranchWorkingHours";
import { BRANCH } from "../../../interfaces/settings/branches-warehouses/branches-warehouses";

const Branch = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    control,
  } = useForm<BRANCH>();
  const onSubmit = (data: BRANCH) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Branch"
        parentLabel="Branches & Warehouses"
        parentTarget="/branch-warehouse"
      />
      <BranchInformation
        errors={errors}
        register={register}
        control={control}
      />
      <BranchLocation
        setValue={setValue}
        errors={errors}
        register={register}
        control={control}
      />
      <BranchWorkingHours
        errors={errors}
        register={register}
        control={control}
      />
    </div>
  );
};

export default Branch;
