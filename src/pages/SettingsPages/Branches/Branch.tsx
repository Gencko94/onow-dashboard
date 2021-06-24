import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";
import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import { BRANCH } from "../../../interfaces/settings/branches/branches";

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
        parentLabel="Branches"
        parentTarget="/settings/branches"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button>Submit</button>
        <BranchWorkingHours
          errors={errors}
          register={register}
          control={control}
        />
      </form>
    </div>
  );
};

export default Branch;
