import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiBuilding } from "react-icons/bi";
import { FaRoad } from "react-icons/fa";
import { MdLocalPostOffice, MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import { countryList } from "../../../data/countryList";
import { STORE_INFORMATION } from "../../../interfaces/settings/store-properties/store-properties";
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Select from "../../reusable/Select";
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
            <Textarea
              errors={errors?.description}
              label="Store Description"
              name="description"
              register={register}
              required
              requiredMessage="Required"
            />
          </div>
        </div>

        <div className="section">
          <Heading tag="h5" color="heading" mb="1rem">
            Store Headquarters
          </Heading>
          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
            {/* <Select
              control={control}
              defaultValue={countryList[0]}
              errors={errors}
              label="Country"
              name="headquarters.country"
              options={countryList}
              required
              requiredMessage="Required"
              getOptionLabel={(option) => option.name[language]}
              getOptionValue={(option) => option.code}
            /> */}
            {/* <div>
              <label>Country</label>
              <Controller
                name="headquarters.country"
                control={control}
                rules={{ required: "Required" }}
                render={({ field: { ref, onChange } }) => (
                  <>
                    <Select
                      ref={ref}
                      styles={selectStyles}
                      placeholder="Select Variation Type..."
                      options={countryList}
                      defaultValue={countryList[0]}
                      isSearchable={false}
                      getOptionLabel={(option) => option.name[language]}
                      getOptionValue={(option) => option.code}
                      onChange={(value) => {
                        onChange(value?.code);
                      }}
                    />
                    <p className="error">
                      {errors?.headquarters?.country?.message}
                    </p>
                  </>
                )}
              />
            </div> */}
            {/* <Select
              control={control}
              defaultValue={countryList[0]}
              errors={errors}
              label="City"
              name="headquarters.city"
              options={countryList}
              required
              getOptionLabel={(option) => option.name[language]}
              getOptionValue={(option) => option.code}
            /> */}
            {/* <div>
              <label>City</label>
              <Controller
                name="headquarters.city"
                control={control}
                rules={{ required: "Required" }}
                render={({ field: { ref, onChange } }) => (
                  <>
                    <Select
                      ref={ref}
                      styles={selectStyles}
                      placeholder="Select Variation Type..."
                      options={countryList}
                      defaultValue={countryList[0]}
                      isSearchable={false}
                      getOptionLabel={(option) => option.name[language]}
                      getOptionValue={(option) => option.code}
                      onChange={(value) => {
                        onChange(value?.code);
                      }}
                    />
                    <p className="error">
                      {errors?.headquarters?.city?.message}
                    </p>
                  </>
                )}
              />
            </div> */}
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
        </div>
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
