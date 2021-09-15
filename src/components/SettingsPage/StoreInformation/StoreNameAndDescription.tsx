import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { USER } from "../../../interfaces/auth/auth";
import { STORE_NAME_AND_DESCRIPTION } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreNameAndDescription } from "../../../utils/queries/settingsQueries";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input/Input";
import Textarea from "../../reusable/Textarea";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";

interface StoreNameAndDescriptionProps {
  data: STORE_NAME_AND_DESCRIPTION;
}

const StoreNameAndDescription = ({ data }: StoreNameAndDescriptionProps) => {
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm<STORE_NAME_AND_DESCRIPTION>({ defaultValues: { ...data } });
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, reset } = useMutation(
    editStoreNameAndDescription,
    {
      onSuccess: (data) => {
        queryClient.setQueryData<USER | undefined>("auth", (prev) => {
          if (prev) {
            return {
              ...prev,
              store: {
                ...prev.store,
                ...data,
              },
            };
          }
        });
      },
    }
  );
  const {
    i18n: { language },
  } = useTranslation();

  const onSubmit = async (data: STORE_NAME_AND_DESCRIPTION) => {
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
      <Box type="titled" boxTitle="Store General Information">
        <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="Store Name English"
            {...register("name.en", { required: "required" })}
          />

          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="Store Name Arabic"
            {...register("name.ar", { required: "required" })}
          />
        </Grid>

        <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
          <Textarea
            errors={errors?.description?.en}
            label="Store Description"
            name="description.en"
            register={register}
            required
            requiredMessage="Required"
          />
          <Textarea
            errors={errors?.description?.ar}
            label="Store Description Arabic"
            name="description.ar"
            register={register}
            required
            requiredMessage="Required"
          />
        </Grid>

        <Flex items="center" justify="center" padding="1rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
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

export default StoreNameAndDescription;

// const Box = styled.div`
//   box-shadow: ${(props) => props.theme.shadow};
//   border-radius: 6px;
//   background-color: ${(props) => props.theme.subtleFloating};
//   .section {
//     border-bottom: ${(props) => props.theme.border};
//     padding: 1rem;

//     .store-headquarters {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       column-gap: 1rem;
//       row-gap: 0.5rem;
//     }
//   }
// `;
