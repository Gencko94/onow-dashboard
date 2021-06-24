import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import IconedInput from "../../../reusable/Inputs/IconedInput";

import InlineMap from "../../../reusable/InlineMap";
import Textarea from "../../../reusable/Textarea";
import { IoLocate } from "react-icons/io5";

interface IProps {
  register: any;
  errors: any;
  setValue: any;
  control: Control<any>;
}
const options = [
  {
    title: {
      ar: "نسبة",
      en: "Percent",
    },
    value: "percent",
  },
  {
    title: {
      ar: "مبلغ ثابت",
      en: "Fixed Amount",
    },
    value: "fixed",
  },
];
const BranchLocation = ({ control, errors, register, setValue }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="title-container">
        <h5>Branch Location</h5>
      </div>
      <div className="box">
        <div className="inputs">
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
        </div>

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
            shipment companies to find your branch/warehouse
          </p>
        </div>
      </div>
    </Container>
  );
};

export default BranchLocation;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, border, bodyColor } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: ${bodyColor};
    border: ${border};
    border-radius: 6px;
    padding: 1rem;
}
.box {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items:flex-start;

}
.inputs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    
}
@media ${breakpoints.md} {
    .box {
        grid-template-columns: 1fr 0.8fr;
      }
    .inputs {
      grid-template-columns: 1fr 1fr;
    }
    .map-container {
      .label {
      }
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
