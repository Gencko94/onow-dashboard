import { Controller, useForm } from "react-hook-form";

import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { useMutation } from "react-query";

import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { STORE_TECHNICAL_SUPPORT } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreTechnicalSupport } from "../../../utils/queries/settingsQueries";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input/Input";
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

  const { mutateAsync, isLoading, reset } = useMutation(
    editStoreTechnicalSupport
  );

  const onSubmit = async (data: STORE_TECHNICAL_SUPPORT) => {
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
        <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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

          <Input
            startAdornment={<AiOutlineWhatsApp />}
            errors={errors}
            label="WhatsApp"
            {...register("whatsapp")}
          />
        </Grid>
        <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <Input
            startAdornment={<AiOutlineMail />}
            errors={errors}
            label="Email Address"
            {...register("email")}
          />
          <Input
            startAdornment={<AiOutlinePhone />}
            errors={errors}
            label="Landline"
            {...register("landline")}
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
