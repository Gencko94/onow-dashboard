import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { STORE_SOCIAL_NETWORK } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreSocialMedia } from "../../../utils/queries/settingsQueries";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input/Input";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
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
        <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <Input
            label="Instagram"
            errors={errors}
            startAdornment="https://instagram.com/"
            {...register("instagram")}
          />
          <Input
            label="Twitter"
            errors={errors}
            startAdornment="https://www.twitter.com/"
            {...register("twitter")}
          />
        </Grid>
        <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <Input
            label="Snapchat"
            errors={errors}
            startAdornment="https://www.snapchat.com/add/"
            {...register("snapchat")}
          />
          <Input
            label="Facebook"
            errors={errors}
            startAdornment="https://www.facebook.com/"
            {...register("facebook")}
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
