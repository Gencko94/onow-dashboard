import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";
import { MdSubtitles } from "react-icons/md";
import { useInfiniteQuery } from "react-query";
import { getBranches } from "../../utils/queries";
import Input from "../reusable/Input/Input";
import PhoneInput from "../reusable/Inputs/PhoneInput";

import { GET_BRANCHES_RES } from "../SettingsPage/StoreBranches/BranchesList";

import Select from "../reusable/Select";
import Box from "../reusable/Box/Box";
import Grid from "../StyledComponents/Grid";
interface IProps {
  register: any;
  errors: any;
  control: Control<any>;
}
const roleOptions: { label: { [key: string]: string }; value: string }[] = [
  {
    label: {
      ar: "(لديه جميع الصلاحيات)مدير",
      en: "Admin (Has all Permissions)",
    },
    value: "ADMIN",
  },
  {
    label: {
      ar: "عضو",
      en: "Staff Member",
    },
    value: "STAFF",
  },
];

const NewStaffMemberInformation = ({ register, errors, control }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data, isLoading } = useInfiniteQuery<GET_BRANCHES_RES>(
    "branches",
    ({ pageParam = 1 }) => getBranches(pageParam),
    {
      suspense: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  return (
    <Box type="titled" boxTitle="Staff Member Information">
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="First Name"
          {...register("first_name", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Last Name"
          {...register("last_name", { required: "Required" })}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <PhoneInput
                errors={errors?.phone}
                label="Phone Number"
                onChange={(value) => {
                  onChange(`+${value}`);
                }}
                value={value}
              />
            );
          }}
        />

        <Input
          startAdornment={<AiOutlineMail />}
          errors={errors}
          label="Email Address"
          {...register("email", { required: "Required" })}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<CgPassword />}
          errors={errors}
          label="Password"
          {...register("password", { required: "Required" })}
        />
        <Controller
          control={control}
          name="branches"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <Select
                errors={errors.branch_id}
                getOptionLabel={(option) => option!.name[language]}
                getOptionValue={(option) => option!.id.toString()}
                options={data!.pages[0].data}
                label="Accessible Branches"
                onChange={onChange}
                isLoading={isLoading}
                ref={ref}
                value={value}
                isMulti
              />
            );
          }}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Controller
          control={control}
          name="roles"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                errors={errors.role}
                options={roleOptions}
                getOptionLabel={(option) => option.label[language]}
                getOptionValue={(option) => option.value}
                label="Role"
                onChange={(option) => onChange(option.value)}
                value={
                  roleOptions.find((option) => option.value === value) as {
                    label: { [key: string]: string };
                    value: string;
                  }
                }
              />
            );
          }}
        />
      </Grid>
    </Box>
  );
};

export default NewStaffMemberInformation;
