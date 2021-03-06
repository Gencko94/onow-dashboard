import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineFileProtect, AiOutlineMail } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import styled from "styled-components";

import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import CountrySelectInput from "../../../components/reusable/CountrySelectInput";
import InlineFileUploader from "../../../components/reusable/InlineFileUploader";
import Input from "../../../components/reusable/Input/Input";
import Select from "../../../components/reusable/Select";
import Flex from "../../../components/StyledComponents/Flex";
import { countrylistWithDialCodes } from "../../../data/countryList";
import { CREATE_PAYMENT_GATEWAY } from "../../../interfaces/settings/payment-methods/payment-methods";

const accountTypeOptions: { label: { [key: string]: string }; value: any }[] = [
  {
    label: {
      ar: "فردي",
      en: "Individual",
    },
    value: "individual",
  },
  {
    label: {
      ar: "شركة",
      en: "Company",
    },
    value: "company",
  },
];

const CreatePaymentGatewayAccount = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CREATE_PAYMENT_GATEWAY>();
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Kuwait",
    dialCode: "+965",
    isoCode: "KW",
    flag: "https://www.countryflags.io/KW/flat/32.png",
  });
  const {
    i18n: { language },
  } = useTranslation();
  const onSubmit: SubmitHandler<CREATE_PAYMENT_GATEWAY> = (data) => {};
  const account_type = watch("account_type");
  return (
    <div id="parent">
      <Breadcrumbs
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "طرق الدفع", en: "Payment gateways" },
            target: "/settings/payment-gateways",
          },
          {
            name: {
              ar: "إنشاء حساب جديد",
              en: "Create New Payment gateway account",
            },
            target: "",
          },
        ]}
      />
      <Container>
        <div className="title-container">
          <h5>Please fill up this form</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="box">
          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="First name"
            {...register("first_name", { required: "Required" })}
          />
          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="Last name"
            {...register("last_name", { required: "Required" })}
          />
          <Input
            startAdornment={<AiOutlineMail />}
            errors={errors}
            label="Email Address"
            {...register("email", { required: "Required" })}
          />
          <Controller
            control={control}
            name="phone"
            rules={{ required: "Required" }}
            render={({ field: { onChange } }) => {
              return (
                <CountrySelectInput
                  selectOptions={countrylistWithDialCodes}
                  errors={errors.phone}
                  onSelectChange={(country) => setSelectedCountry(country)}
                  label="Phone Number"
                  selectValue={selectedCountry}
                  onInputChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              );
            }}
          />
          <div style={{ gridColumn: "1/3" }}>
            <Input
              startAdornment={<AiOutlineMail />}
              errors={errors}
              label="Business Name"
              placeholder="Enter your business name"
              {...register("business_name", { required: "Required" })}
            />
          </div>
          <Controller
            control={control}
            name="id_front_side"
            rules={{ required: "Required" }}
            render={({ field: { onChange, value, ref } }) => (
              <div>
                <InlineFileUploader
                  accept="images/jpg, image/jpeg"
                  onChange={(file) => {
                    onChange(file);
                  }}
                  label="National ID Front Side"
                />
                <p className="error">{errors?.id_front_side?.message}</p>
              </div>
            )}
          />
          <Controller
            control={control}
            name="id_back_side"
            rules={{ required: "Required" }}
            render={({ field: { onChange, value, ref } }) => (
              <div>
                <InlineFileUploader
                  accept="images/jpg, image/jpeg"
                  onChange={(file) => {
                    onChange(file);
                  }}
                  label="National ID Back Side"
                />
                <p className="error">{errors?.id_back_side?.message}</p>
              </div>
            )}
          />
          <Controller
            control={control}
            name="account_type"
            defaultValue="individual"
            rules={{ required: "Required" }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                options={accountTypeOptions}
                getOptionLabel={(option) => option?.label[language]}
                getOptionValue={(option) => option?.value}
                errors={errors.account_type}
                label="Vendor Sector"
                onChange={onChange}
                value={
                  accountTypeOptions.find((o) => o.value === value) as {
                    value: any;
                    label: {
                      [key: string]: string;
                    };
                  }
                }
                placeholder="Select Account Type"
              />
            )}
          />
          <Controller
            control={control}
            name="account_type"
            defaultValue="individual"
            rules={{ required: "Required" }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                options={accountTypeOptions}
                getOptionLabel={(option) => option?.label[language]}
                getOptionValue={(option) => option?.value}
                errors={errors.account_type}
                label="Account Type"
                onChange={(option) => onChange(option.value)}
                value={
                  accountTypeOptions.find((o) => o.value === value) as {
                    value: any;
                    label: {
                      [key: string]: string;
                    };
                  }
                }
                placeholder="Select Account Type"
              />
            )}
          />

          {account_type === "company" && (
            <>
              <div style={{ gridColumn: "1/3" }}>
                <Input
                  startAdornment={<AiOutlineFileProtect />}
                  errors={errors}
                  label="License Number"
                  placeholder="Enter your license number"
                  {...register("license_number", {
                    required: account_type === "company" && "Required",
                  })}
                />
              </div>
              <Controller
                control={control}
                name="license_copy"
                rules={{ required: account_type === "company" && "Required" }}
                render={({ field: { onChange, value, ref } }) => (
                  <div>
                    <InlineFileUploader
                      accept="images/jpg, image/jpeg"
                      onChange={(file) => {
                        onChange(file);
                      }}
                      label="License Copy"
                    />
                    <p className="error">{errors?.license_copy?.message}</p>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="authorized_signature"
                rules={{ required: account_type === "company" && "Required" }}
                render={({ field: { onChange, value, ref } }) => (
                  <div>
                    <InlineFileUploader
                      accept="images/jpg, image/jpeg"
                      onChange={(file) => {
                        onChange(file);
                      }}
                      label="Your Authorized Signature"
                    />
                    <p className="error">
                      {errors?.authorized_signature?.message}
                    </p>
                  </div>
                )}
              />
            </>
          )}
          <Input
            startAdornment={<RiBankFill />}
            errors={errors}
            label="Bank IBAN"
            placeholder="Enter your Bank IBAN"
            desc="Enter the information of your company bank account if you have a commercial license, if not, enter the information of your personal bank account."
            {...register("bank_iban", { required: "Required" })}
          />
          <div style={{ gridColumn: "1/3" }}>
            <Flex justify="center" items="center">
              <Button withTransition type="submit" color="green">
                Send Data
              </Button>
            </Flex>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CreatePaymentGatewayAccount;

const Container = styled.div`
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${(props) => props.theme.primary};
  }
  .box {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.dangerRed};
  }
  ${Flex} {
    margin: 1rem 0;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    .box {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
