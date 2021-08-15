import { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import Box from "../../reusable/Box/Box";

import CategorySelection from "../../reusable/CategorySelection";
import GithubInput from "../../reusable/Inputs/GithubInput";

import IconedInput from "../../reusable/Inputs/IconedInput";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import Textarea from "../../reusable/Textarea";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
interface IProps {
  register: any;
  errors: any;
  watch: any;
  control: Control<any>;
  setValue?: any;
}

const CategoryInfo = ({
  control,
  errors,
  register,
  setValue,
  watch,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const formCategoryId = watch("parent_id");
  const nameEn: string = watch("name.en");
  const currentId: number = watch("id");

  useEffect(() => {
    if (nameEn) {
      setValue?.("slug", nameEn.toLowerCase().split(" ").join("-"));
    }
  }, [nameEn]);
  return (
    <Grid cols="repeat(auto-fit,minmax(310px,1fr))" gap="1rem">
      <Box type="titled" boxTitle="Category Information">
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
          name="active"
          render={({ field: { onChange, value } }) => {
            return (
              <GithubInput
                label="Show Category"
                checked={value}
                onChange={(e) => {
                  if (value === true) {
                    onChange(false);
                  } else {
                    onChange(true);
                  }
                }}
              />
            );
          }}
        />
      </Box>
      <Box type="titled" boxTitle="Category Parent">
        <Controller
          control={control}
          name="parent_id"
          // rules={{
          //   required: "Required",
          // }}
          render={({ field: { onChange } }) => {
            return (
              <div className="category-list">
                <CategorySelection
                  errors={errors?.parent_id}
                  formCategoryId={formCategoryId}
                  onChange={onChange}
                  currentId={currentId}
                />
              </div>
            );
          }}
        />
      </Box>
    </Grid>
  );
};

export default CategoryInfo;
