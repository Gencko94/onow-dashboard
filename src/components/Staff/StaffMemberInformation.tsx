import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import Box from "../reusable/Box/Box";
import Input from "../reusable/Input/Input";
import PhoneInput from "../reusable/Inputs/PhoneInput";
import Select from "../reusable/Select";
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
const branches: {
  label: { [key: string]: string };
  value: number;
}[] = [
  {
    label: {
      ar: "السالمية",
      en: "Salmiyah",
    },
    value: 1,
  },
];
const StaffMemberInformation = ({ register, errors, control }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
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
          render={({ field: { onChange, value } }) => {
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
        <Controller
          control={control}
          name="branch_id"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                errors={errors.branch_id}
                getOptionLabel={(option) => option!.label[language]}
                getOptionValue={(option) => option!.value.toString()}
                options={branches}
                label="Accessible Branches"
                onChange={(options) => {
                  onChange(options.map((option: any) => option.value));
                }}
                value={branches.find((i) => i.value === value)}
                isMulti
              />
            );
          }}
        />
        <Controller
          control={control}
          name="role"
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

export default StaffMemberInformation;
