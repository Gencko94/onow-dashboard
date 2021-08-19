import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { useMutation } from "react-query";

import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { STORE_TECHNICAL_SUPPORT } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreTechnicalSupport } from "../../../utils/queries/settingsQueries";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import PhoneInput from "../../reusable/Inputs/PhoneInput";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";

interface StoreTechnicalSupportProps {
  data: STORE_TECHNICAL_SUPPORT;
}
const StoreTechnicalSupport = ({ data }: StoreTechnicalSupportProps) => {
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
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
      <Box type="titled" boxTitle="Technical Support">
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <PhoneInput
                  label="Phone Number"
                  value={value}
                  errors={errors?.phone}
                  onChange={(data) => onChange(`+${data}`)}
                />
              );
            }}
          />

          <IconedInput
            Icon={AiOutlineWhatsApp}
            errors={errors?.whatsapp}
            register={register}
            name="whatsapp"
            label="WhatsApp"
          />
        </Grid>
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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

        <Flex items="center" justify="center" padding="1rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            color="green"
            type="submit"
            withTransition
          >
            Save Changes
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default StoreTechnicalSupport;
