import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";

import IconedInput from "../../../reusable/Inputs/IconedInput";
import PrefixedIconedInput from "../../../reusable/Inputs/PrefixedIconedInput";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import { secondTabProps } from "../CreateProductPricingAndOptions";
interface IProps {
  index: number;
  parentIndex: number;
  removeValue: (index?: number | number[] | undefined) => void;
  valuesCount: number;
}

const OptionValue = ({
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

  return (
    <Container>
      <Flex justify="flex-end">
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
      <div className="inputs">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[parentIndex]?.values?.[index]?.name?.en}
          name={`options.${parentIndex}.values.${index}.name.en`}
          register={register}
          label="Value Name English"
          required
          requiredMessage="Required"
          defaultValue={options?.[index].name.en}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[parentIndex]?.values?.[index]?.name?.ar}
          name={`options.${parentIndex}.values.${index}.name.ar`}
          register={register}
          label="Value Name Arabic"
          defaultValue={options?.[index].name.ar}
          requiredMessage="Required"
          required
        />
        <PrefixedIconedInput
          errors={errors?.options?.[parentIndex]?.values?.[index]?.price}
          Icon={IoPricetagsOutline}
          name={`options.${parentIndex}.values.${index}.price`}
          register={register}
          label="Price"
          prefix="KD"
          desc="Leave empty to disable"
          defaultValue={options?.[index].price}
        />
        <IconedInput
          errors={errors?.options?.[parentIndex]?.values?.[index]?.qty}
          Icon={RiHandCoinLine}
          name={`options.${parentIndex}.values.${index}.qty`}
          register={register}
          label="Stock Quantity"
          desc="Leave empty for unlimited"
          defaultValue={options?.[index].qty}
        />
      </div>
    </Container>
  );
};

export default OptionValue;
const Container = styled.div`
  background-color: ${(props) => props.theme.overlayColor};
  padding: 0.5rem 1rem 1rem 1rem;
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  margin: 1rem 0;
  ${FlexWrapper} {
    margin: 0 !important;
    .delete {
      color: ${(props) => props.theme.dangerRed};
    }
  }
  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
  }
  .values {
  }
`;
