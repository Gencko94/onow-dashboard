import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";
import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import { NEW_BRANCH } from "../../../interfaces/settings/branches-warehouses/branches-warehouses";

const CreateNewBranch = () => {
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    control,
  } = useForm<NEW_BRANCH>({
    defaultValues: {
      cod_enabled: true,
      cod_cost: 0,
      working_hours: {
        saturday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        sunday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        monday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        tuesday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        wednesday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        thursday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        friday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
      },
    },
  });
  const onSubmit = (data: NEW_BRANCH) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Branch"
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
        <BranchWorkingHours
          errors={errors}
          register={register}
          control={control}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default CreateNewBranch;
