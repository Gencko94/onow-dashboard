import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";

import IconedInput from "../../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import InlineMap from "../../../reusable/InlineMap";
import { firstBranchTabInfo } from "./NewBranchInfoAndLocation";

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
const NewBranchLocation = () => {
  const {
    control,
    formState: { errors },
    register,
    setValue,
  } = useFormContext<firstBranchTabInfo>();
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
            Icon={MdSubtitles}
            errors={errors?.address?.street}
            register={register}
            required
            requiredMessage="Required"
            label="Street"
            name="address.street"
          />
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.name?.ar}
            register={register}
            required
            requiredMessage="Required"
            label="Branch Name Arabic"
            name="name.ar"
          />

          <IconedNumberInput
            Icon={IoMdCash}
            errors={errors?.cod_cost}
            register={register}
            required
            requiredMessage="Required"
            label="Cash on Delivery cost"
            name="cod_cost"
            min={0}
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

export default NewBranchLocation;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
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