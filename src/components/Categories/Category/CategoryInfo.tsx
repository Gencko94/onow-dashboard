import { Control, Controller, SetFieldValue, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import MiniFileUploader from "../../../utils/MiniFileUploader";

import IconedInput from "../../reusable/Inputs/IconedInput";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import Select from "../../reusable/Select";
import Textarea from "../../reusable/Textarea";
interface IProps {
  register: any;
  errors: any;
  setValue: SetFieldValue<any>;
  control: Control<any>;
}
const options = [
  {
    title: {
      ar: "نسبة",
      en: "Percent",
    },
    value: "percent",
  },
  {
    title: {
      ar: "مبلغ ثابت",
      en: "Fixed Amount",
    },
    value: "fixed",
  },
];
const CategoryInfo = ({ control, errors, register, setValue }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const isChild = useWatch({
    control,
    name: "as_child",
  });
  return (
    <Container>
      <div className="title-container">
        <h5>Category Information</h5>
      </div>
      <div className="box">
        <div className="info">
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.name?.en}
            register={register}
            required
            requiredMessage="Required"
            label="Category Name English"
            name="name.en"
          />
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.name?.ar}
            register={register}
            required
            requiredMessage="Required"
            label="Category Name Arabic"
            name="name.ar"
          />
          <PrefixedInput
            prefixText="https://your-store/categories/"
            errors={errors?.slug}
            register={register}
            required
            requiredMessage="Required"
            label="Category Slug"
            name="slug"
            desc="How your category will look in the url"
          />
          <Controller
            control={control}
            name="as_child"
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  onChange={(val) => onChange(val.value)}
                  label="As a child category"
                  errors={errors?.as_child}
                  options={[
                    {
                      title: {
                        ar: "نعم",
                        en: "Yes",
                      },
                      value: true,
                    },
                    {
                      title: {
                        ar: "لا",
                        en: "No",
                      },
                      value: false,
                    },
                  ]}
                  defaultValue={false}
                  getOptionLabel={(option: any) => option.title[language]}
                  getOptionValue={(option: any) => option.value}
                />
              );
            }}
          />

          {isChild && (
            <Controller
              control={control}
              name="parent"
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    label="Select Category Parent"
                    onChange={(val) => onChange(val.value)}
                    required={isChild}
                    errors={errors?.parent}
                    options={options}
                    defaultValue="fixed"
                    getOptionLabel={(option: any) => option.title[language]}
                    getOptionValue={(option) => option.value}
                  />
                );
              }}
            />
          )}
          <Textarea
            errors={errors?.seo_description}
            register={register}
            required
            requiredMessage="Required"
            label="SEO Description"
            name="seo_description"
          />
        </div>
        <div className="image-section">
          <h5>Category Image</h5>
          <MiniFileUploader
            control={control}
            accept="image/*"
            setValue={setValue}
            name="image"
          />
          <div className="specs">
            <p>Preffered width and height : 32px(width) X 32px(height)</p>
            <p>Maximum size allowed : 2048KB</p>
            <p>Accepted Formats : .jpeg .png .jpg</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryInfo;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .info {
    display:grid;
    grid-template-columns:1fr;
    gap:1rem;
  }
  .image-section {
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    h5 {
      margin-bottom:1rem;
    }
    .specs {
      margin-top:0.5rem;
      font-size:0.8rem;
      text-align:center;
    }
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 2fr 1fr;  
    }
    .info {
      display:grid;
      grid-template-columns:1fr 1fr;
    }
  }
  `
);
