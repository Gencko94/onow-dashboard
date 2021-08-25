import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { CgArrowsExpandDownLeft, CgPassword } from "react-icons/cg";
import { MdSubtitles } from "react-icons/md";
import { useInfiniteQuery } from "react-query";
import { getBranches } from "../../utils/queries";
import IconedInput from "../reusable/Inputs/IconedInput";
import PhoneInput from "../reusable/Inputs/PhoneInput";
import S, { GroupTypeBase, Styles } from "react-select";
import { GET_BRANCHES_RES } from "../SettingsPage/StoreBranches/BranchesList";
import { useMemo } from "react";
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
  const selectStyles:
    | Partial<Styles<any, false, GroupTypeBase<any>>>
    | undefined = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        fontSize: "0.9rem",
        minHeight: "35px",
      }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        padding: "6px",
        display: "grid",
      }),
      option: (provided, state) => {
        return {
          ...provided,
          fontSize: "1.9rem",
        };
      },
      menu: (provided, state) => {
        return {
          ...provided,

          zIndex: 200,
        };
      },
    };
  }, []);
  return (
    <Box type="titled" boxTitle="Staff Member Information">
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.first_name}
          register={register}
          required
          requiredMessage="Required"
          label="First Name"
          name="first_name"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.last_name}
          register={register}
          required
          requiredMessage="Required"
          label="Last Name"
          name="last_name"
        />
      </Grid>
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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

        <IconedInput
          Icon={AiOutlineMail}
          errors={errors?.email}
          register={register}
          required
          requiredMessage="Required"
          label="Email Address"
          name="email"
        />
      </Grid>
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <IconedInput
          Icon={CgPassword}
          errors={errors?.password}
          register={register}
          required
          requiredMessage="Required"
          label="Password"
          name="password"
        />
        <Controller
          control={control}
          name="branches"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value, ref } }) => {
            console.log(value);
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
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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
