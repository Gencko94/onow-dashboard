import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { USER } from "../../../interfaces/auth/auth";
import { STORE_NAME_AND_DESCRIPTION } from "../../../interfaces/settings/store-properties/store-properties";
import extractError from "../../../utils/extractError";
import { editStoreNameAndDescription } from "../../../utils/queries/settingsQueries";
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Textarea from "../../reusable/Textarea";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

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
      <Heading tag="h5" color="primary" margin="2rem 0" weight="semibold">
        Store Information
      </Heading>
      <Box>
        <div className="section">
          <Heading tag="h5" color="heading" mb="1rem">
            Store Name
          </Heading>

          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.en}
              register={register}
              name="name.en"
              required
              requiredMessage="Name Required"
              label="Store Name English"
            />

            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.ar}
              register={register}
              name="name.ar"
              required
              requiredMessage="Name Required"
              label="Store Name Arabic"
            />
          </Grid>
          <div className="description">
            <Heading tag="h5" color="heading" mb="1rem">
              Store Description
            </Heading>
            <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
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
          </div>
        </div>

        {/* <div className="section">
          <Heading tag="h5" color="heading" mb="1rem">
            Store Headquarters
          </Heading>
          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
           
            <IconedInput
              label="Avenue"
              register={register}
              errors={errors?.headquarters?.avenue}
              Icon={FaRoad}
              name="headquarters.avenue"
            />
            <IconedInput
              label="Street"
              register={register}
              errors={errors?.headquarters?.street}
              Icon={FaRoad}
              name="headquarters.street"
            />
            <IconedInput
              label="Building Number"
              register={register}
              errors={errors?.headquarters?.buildingNo}
              Icon={BiBuilding}
              name="headquarters.buildingNo"
            />
            <IconedInput
              label="P.O Address"
              register={register}
              errors={errors?.headquarters?.poAddress}
              Icon={MdLocalPostOffice}
              name="headquarters.poAddress"
            />
          </Grid>
        </div> */}
        <Flex items="center" justify="center" padding="1rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            text="Save"
            type="submit"
            bg="green"
            padding="0.5rem"
            withRipple
            withTransition
          />
        </Flex>
      </Box>
    </form>
  );
};

export default StoreNameAndDescription;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  background-color: #fff;
  .section {
    border-bottom: ${(props) => props.theme.border};
    padding: 1rem;

    /* .store-name-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .description {
        grid-column: 1/3;
      }
    } */
    .store-headquarters {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
    }
  }
`;
