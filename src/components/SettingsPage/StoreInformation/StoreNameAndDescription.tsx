import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import { STORE_INFORMATION } from "../../../interfaces/settings/store-properties/store-properties";
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Textarea from "../../reusable/Textarea";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const StoreNameAndDescription = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<STORE_INFORMATION>();
  const {
    i18n: { language },
  } = useTranslation();

  const onSubmit = (data: STORE_INFORMATION) => {
    console.log(data);
  };
  return (
    <div>
      <Heading tag="h5" color="primary" margin="2rem 0">
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
            onClick={handleSubmit(onSubmit)}
            text="Save"
            bg="green"
            padding="0.5rem"
            withRipple
            withTransition
          />
        </Flex>
      </Box>
    </div>
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
