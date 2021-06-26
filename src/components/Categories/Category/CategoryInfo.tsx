import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";

import CategorySelection from "../../reusable/CategorySelection";

import IconedInput from "../../reusable/Inputs/IconedInput";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import Textarea from "../../reusable/Textarea";
import Grid from "../../StyledComponents/Grid";
interface IProps {
  register: any;
  errors: any;
  watch: any;
  control: Control<any>;
}

const CategoryInfo = ({
  control,
  errors,
  register,

  watch,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const formCategory = watch("parent_category");
  // console.log(form);
  return (
    <Container>
      <Grid cols="2fr 1fr" gap="1rem">
        <div>
          <div className="title-container">
            <h5>Category Information</h5>
          </div>
          <div className="box">
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

            <Textarea
              errors={errors?.description?.en}
              register={register}
              required
              requiredMessage="Required"
              label="Description English"
              name="description.en"
            />
            <Textarea
              errors={errors?.description?.ar}
              register={register}
              required
              requiredMessage="Required"
              label="Description Arabic"
              name="description.ar"
            />
          </div>
        </div>
        <div className="categories-section">
          <div className="title-container">
            <h5>Category Parent</h5>
          </div>
          <Controller
            control={control}
            name="parent_category"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange } }) => {
              return (
                <div className="category-list">
                  <CategorySelection
                    errors={errors?.parent_id}
                    formCategory={formCategory}
                    onChange={onChange}
                  />
                </div>
              );
            }}
          />
        </div>
      </Grid>
    </Container>
  );
};

export default CategoryInfo;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, border, shadow, errorShadow } }) => `
  margin: 1rem 0;
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
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .categories-section {
      display:flex;
      // align-items:center;
      flex-direction:column;
      .category-list {
        flex:1;
        max-height:447px;
        overflow-y: auto;
        position: relative;
        background-color: #fff;
        box-shadow:${shadow};
        border-radius: 6px;
        
      }
    }
  
  
  
  @media ${breakpoints.md} {
    
    
  }
  `
);
