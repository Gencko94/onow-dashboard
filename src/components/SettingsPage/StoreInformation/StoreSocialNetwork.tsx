import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { STORE_SOCIAL_NETWORK } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreSocialMedia } from "../../../utils/queries/settingsQueries";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
interface StoreSocialNetworkProps {
  data: STORE_SOCIAL_NETWORK;
}
const StoreSocialNetwork = ({ data }: StoreSocialNetworkProps) => {
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<STORE_SOCIAL_NETWORK>({ defaultValues: { ...data } });
  const {
    i18n: { language },
  } = useTranslation();
  const { mutateAsync, isLoading, reset } = useMutation(editStoreSocialMedia);

  const onSubmit = async (data: STORE_SOCIAL_NETWORK) => {
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
      <Box type="titled" boxTitle="Social network accounts">
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <PrefixedInput
            label="Instagram"
            errors={errors.instagram}
            name="instagram"
            prefixText="https://instagram.com/"
            register={register}
          />
          <PrefixedInput
            label="Twitter"
            errors={errors.twitter}
            name="twitter"
            prefixText="https://www.twitter.com/"
            register={register}
          />
        </Grid>
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <PrefixedInput
            label="Snapchat"
            errors={errors.snapchat}
            name="snapchat"
            prefixText="https://www.snapchat.com/add/"
            register={register}
          />
          <PrefixedInput
            label="Facebook"
            errors={errors.facebook}
            name="facebook"
            prefixText="https://www.facebook.com/"
            register={register}
          />
        </Grid>

        <Flex items="center" justify="center" padding="1rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            color="green"
            withTransition
          >
            Save changes
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default StoreSocialNetwork;
