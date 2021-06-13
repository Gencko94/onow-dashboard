import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import IconedInput from "../reusable/Inputs/IconedInput";
import Select from "../reusable/Select";
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
    value: "admin",
  },
  {
    label: {
      ar: "عضو",
      en: "Staff Member",
    },
    value: "staff",
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

const NewStaffMemberInformation = ({ register, errors, control }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <div className="title-container">
        <h5>Staff Member Information</h5>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name}
          register={register}
          required
          requiredMessage="Required"
          label="Full Name"
          name="name"
        />
        <IconedInput
          Icon={AiOutlinePhone}
          errors={errors?.phone}
          register={register}
          required
          requiredMessage="Required"
          label="Phone Number"
          name="phone"
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
      </div>
    </Container>
  );
};

export default NewStaffMemberInformation;

const Container = styled.div`
  margin: 1rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${(props) => props.theme.mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;
