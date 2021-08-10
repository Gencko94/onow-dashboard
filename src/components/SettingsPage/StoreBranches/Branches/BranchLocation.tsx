import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import IconedInput from "../../../reusable/Inputs/IconedInput";

import InlineMap from "../../../reusable/InlineMap";
import Textarea from "../../../reusable/Textarea";
import { IoLocate } from "react-icons/io5";
import Heading from "../../../StyledComponents/Heading";
import Grid from "../../../StyledComponents/Grid";

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
    <Container>
      <Heading tag="h5" color="primary">
        Branch Location
      </Heading>
      <div className="box">
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

        <div className="map-container">
          <div className="label">
            <h6>Select Branch Location from Google Maps</h6>
          </div>
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
          <p className="desc">
            Selecting an accurate location will make it easy to customers and
            delivery companies to find your branch
          </p>
        </div>
      </div>
    </Container>
  );
};

export default BranchLocation;

const Container = styled.div(
  ({ theme: { breakpoints, border } }) => `
 
  .box {
   
    border: ${border};
    border-radius: 6px;
    padding: 1rem;
}

.map-container {
  .map {
    height:300px;
    margin:1rem 0;  
  }
  .desc {
    font-size:0.8rem;
  }
}
@media ${breakpoints.md} {
    .box {
        grid-template-columns: 1fr 0.8fr;
      }
   
    .map-container {
      
      .map {
        height:300px;
        margin:1rem 0;  
      }
      .desc {
        font-size:0.8rem;
      }
    }
  }
  `
);
