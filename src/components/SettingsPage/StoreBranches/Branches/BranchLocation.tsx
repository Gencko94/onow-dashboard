import { useFormContext } from "react-hook-form";

import styled from "styled-components";

import Input from "../../../reusable/Input/Input";

import InlineMap from "../../../reusable/InlineMap";
import Textarea from "../../../reusable/Textarea";
import { IoLocate } from "react-icons/io5";

import Grid from "../../../StyledComponents/Grid";
import Box from "../../../reusable/Box/Box";
import Paragraph from "../../../StyledComponents/Paragraph";

const BranchLocation = () => {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext();

  const coords = watch("address.coords");

  return (
    <Box type="titled" boxTitle="Branch location">
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<IoLocate />}
          errors={errors}
          label="Latitude"
          {...register("address.coords.lat", { required: "Required" })}
        />
        <Input
          startAdornment={<IoLocate />}
          errors={errors}
          label="Longitude"
          {...register("address.coords.lng", { required: "Required" })}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Textarea
          errors={errors}
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

const MapContainer = styled.div`
  .map {
    height: 300px;
    margin: 1rem 0;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    .map {
      height: 300px;
      margin: 1rem 0;
    }
  }
`;
