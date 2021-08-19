import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import IconedInput from "../../../reusable/Inputs/IconedInput";

import InlineMap from "../../../reusable/InlineMap";
import Textarea from "../../../reusable/Textarea";
import { IoLocate } from "react-icons/io5";

import Grid from "../../../StyledComponents/Grid";
import Box from "../../../reusable/Box/Box";
import Paragraph from "../../../StyledComponents/Paragraph";
import { up } from "../../../../constants";

const BranchLocation = () => {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext();
  const {
    i18n: { language },
  } = useTranslation();
  const coords = watch("address.coords");
  console.log(coords, "coods");
  return (
    <Box type="titled" boxTitle="Branch location">
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <IconedInput
          Icon={IoLocate}
          errors={errors?.address?.coords?.lat}
          register={register}
          required
          requiredMessage="Required"
          label="Latitude"
          name="address.coords.lat"
        />
        <IconedInput
          Icon={IoLocate}
          errors={errors?.address?.coords?.lng}
          register={register}
          required
          requiredMessage="Required"
          label="Longitude"
          name="address.coords.lng"
        />
      </Grid>
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Textarea
          errors={errors?.address?.address?.en}
          register={register}
          required
          requiredMessage="Required"
          label="Address in English"
          name="address.address.en"
        />
        <Textarea
          errors={errors?.address?.address?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Address in Arabic"
          name="address.address.ar"
        />
      </Grid>

      <MapContainer>
        <Paragraph weight="semibold" fontSize="1rem">
          Select Branch Location from Google Maps
        </Paragraph>

        <div className="map">
          <InlineMap
            mapCenter={{
              lat: coords?.lat ?? 29.3759984126687,
              lng: coords?.lng ?? 47.9774523495,
            }}
            setValue={setValue}
            name="address.coords"
          />
        </div>
        <Paragraph weight="semibold" fontSize="0.8rem" color="textAlt">
          Selecting an accurate location will make it easy to customers and
          delivery companies to find your branch
        </Paragraph>
      </MapContainer>
    </Box>
  );
};

export default BranchLocation;

const MapContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  .map {
    height:300px;
    margin:1rem 0;  
  }
  ${up(breakpoints.md)}{
    .map {
      height:300px;
      margin:1rem 0;  
    }
  }
`
);
