import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";

import Input from "../../../reusable/Input/Input";

import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";
import { secondTabProps } from "../CreateProductPricingAndOptions";
interface IProps {
  index: number;
  parentIndex: number;
  removeValue: (index?: number | number[] | undefined) => void;
  valuesCount: number;
}

const CreateProductOptionValue = ({
  index,
  parentIndex,
  removeValue,
  valuesCount,
}: IProps) => {
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext<secondTabProps>();

  const {
    i18n: { language },
  } = useTranslation();

  const options = watch(`options.${parentIndex}.values` as any);
  const optionsEnabled = watch("options_enabled");

  return (
    <Container>
      <Flex items="center" justify="space-between" margin="0 0 1rem 0">
        <Heading tag="h6" color="subheading">
          Option {parentIndex + 1} Value {index + 1}
        </Heading>
        <button
          type="button"
          onClick={() => {
            if (valuesCount > 1) removeValue(index);
          }}
          className="delete"
        >
          <TiDelete size={30} />
        </button>
      </Flex>
      <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Value Name English"
          defaultValue={options?.[index].name.en}
          {...register(`options.${parentIndex}.values.${index}.name.en`, {
            required: optionsEnabled && "Required",
          })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Value Name Arabic"
          {...register(`options.${parentIndex}.values.${index}.name.ar`, {
            required: optionsEnabled && "Required",
          })}
        />
        <Input
          errors={errors}
          startAdornment={<IoPricetagsOutline />}
          label="Price"
          endAdornment="KD"
          desc="Leave empty to disable"
          defaultValue={options?.[index].price}
          min={0}
          type="number"
          {...register(`options.${parentIndex}.values.${index}.price`)}
        />
        <Input
          errors={errors}
          startAdornment={<RiHandCoinLine />}
          label="Stock Quantity"
          desc="Leave empty for unlimited"
          defaultValue={options?.[index].qty}
          {...register(`options.${parentIndex}.values.${index}.quantity`)}
        />
      </Grid>
    </Container>
  );
};

export default CreateProductOptionValue;
const Container = styled.div(
  ({ theme: { breakpoints, border, dangerRed, accent2 } }) => `
  background-color: ${accent2};
  padding: 0.5rem 1rem 1rem 1rem;
  border: ${border};
  border-radius: 6px;
  margin: 1rem 0;
  .delete {
    color: ${dangerRed};
  }
  `
);
