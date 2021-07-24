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

    setValue,
  } = useFormContext();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <Heading tag="h5" color="primary" margin="2rem 0" weight="semibold">
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
                lat: 29.3759,
                lng: 47.9774,
              }}
              setValue={setValue}
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
  ({ theme: { breakpoints, mainColor, border, bodyColor } }) => `
 
  .box {
    background-color: ${bodyColor};
    border: ${border};
    border-radius: 6px;
    padding: 1rem;
}
// .box {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 1rem;
//     align-items:flex-start;

// }
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
