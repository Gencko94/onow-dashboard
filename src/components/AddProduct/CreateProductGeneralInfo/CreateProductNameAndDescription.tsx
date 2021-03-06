import { useEffect } from "react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";

import Box from "../../reusable/Box/Box";
import Input from "../../reusable/Input/Input";
import Checkbox from "../../reusable/Inputs/Checkbox";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";

import { firstTabInfo } from "./CreateProductGeneralInfo";

const CreateProductNameAndDescription = () => {
  const { formValues } = useContext(NewProductContext);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<firstTabInfo>();
  const quantity = watch("quantity");
  const nameEn = watch("name.en");

  useEffect(() => {
    if (nameEn) {
      setValue?.("slug", nameEn.toLowerCase().split(" ").join("-"));
    }
  }, [nameEn, setValue]);
  return (
    <Box type="titled" boxTitle="Product Naming & Description">
      <Grid columns="repeat(auto-fill,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          data-testid="name.en"
          label="Product Name"
          {...register("name.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          data-testid="name.ar"
          label="Product Name Arabic"
          {...register("name.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          data-testid="description.en"
          label="Short Description English"
          {...register("description.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Short Description Arabic"
          data-testid="description.ar"
          {...register("description.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<BiDetail />}
          errors={errors}
          label="SKU"
          data-testid="sku"
          {...register("sku", { required: "Required" })}
        />
        <div>
          <Input
            startAdornment={<RiHandCoinLine />}
            errors={errors}
            label="Quantity"
            // defaultValue={formValues?.quantity}
            type="number"
            min={0}
            disabled={quantity === "unlimited"}
            {...register("quantity", {
              required: quantity !== "unlimited" && "Required",
            })}
          />
          <Flex items="center">
            <Checkbox
              id="unlimited"
              small
              checked={quantity === "unlimited"}
              onChange={() => {
                if (quantity === "unlimited") {
                  setValue("quantity", "1");
                } else {
                  setValue("quantity", "unlimited");
                }
              }}
            />

            <label htmlFor="unlimited" className="unlimited">
              Unlimited
            </label>
          </Flex>
        </div>
      </Grid>
      <Grid columns="1fr" gap="1rem">
        <Input
          errors={errors}
          label="Slug"
          defaultValue={formValues?.slug}
          startAdornment="https://your-domain.com/products/"
          desc="This is how your product will look in the URL"
          {...register("slug", { required: "Required" })}
        />
      </Grid>
    </Box>
  );
};

export default CreateProductNameAndDescription;
