import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdSmartphone } from "react-icons/md";
import { useMutation } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { STORE_TECHNICAL_SUPPORT } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreTechnicalSupport } from "../../../utils/queries/settingsQueries";
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
interface StoreTechnicalSupportProps {
  data: STORE_TECHNICAL_SUPPORT;
}
const StoreTechnicalSupport = ({ data }: StoreTechnicalSupportProps) => {
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<STORE_TECHNICAL_SUPPORT>({ defaultValues: { ...data } });
  const {
    i18n: { language },
  } = useTranslation();
  const { mutateAsync, isLoading, reset } = useMutation(
    editStoreTechnicalSupport
  );

  const onSubmit = async (data: STORE_TECHNICAL_SUPPORT) => {
    console.log(data);
    try {
      await mutateAsync(data);
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Settings Updated",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h5" color="primary" margin="2rem 0">
        Technical support
      </Heading>
      <Box>
        <div className="section">
          <Grid cols="repeat(auto-fill,minmax(300px,1fr))" gap="1rem">
            <IconedInput
              Icon={MdSmartphone}
              errors={errors?.phone}
              register={register}
              name="phone"
              label="Phone Number"
            />

            <IconedInput
              Icon={AiOutlineWhatsApp}
              errors={errors?.whatsapp}
              register={register}
              name="whatsapp"
              label="WhatsApp"
            />
            <IconedInput
              Icon={AiOutlineMail}
              errors={errors?.email}
              register={register}
              name="email"
              label="Email Address"
            />
            <IconedInput
              Icon={AiOutlinePhone}
              errors={errors?.landline}
              register={register}
              name="landline"
              label="Landline"
            />
          </Grid>
        </div>
        <Flex items="center" justify="center" padding="1rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            text="Save"
            bg="green"
            type="submit"
            padding="0.5rem"
            withRipple
            withTransition
          />
        </Flex>
      </Box>
    </form>
  );
};

export default StoreTechnicalSupport;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  background-color: #fff;
  .section {
    padding: 1rem;
    border-bottom: ${(props) => props.theme.border};
    .section-title {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: ${(props) => props.theme.font.xbold};
    }
  }
`;
