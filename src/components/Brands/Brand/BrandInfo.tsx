import { Control, SetFieldValue } from "react-hook-form";

import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import Input from "../../reusable/Input/Input";
import Textarea from "../../reusable/Textarea";
interface IProps {
  register: any;
  errors: any;
  setValue: SetFieldValue<any>;
  control: Control<any>;
}

const BrandInfo = ({ control, errors, register, setValue }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Brand Information</h5>
      </div>
      <div className="box">
        <div className="info">
          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="Brand Name English"
            {...register("name.en", { required: "Required" })}
          />
          <Input
            startAdornment={<MdSubtitles />}
            errors={errors}
            label="Brand Name Arabic"
            {...register("name.ar", { required: "Required" })}
          />
          <Input
            startAdornment="https://your-store/brands/"
            errors={errors}
            label="Brand Slug"
            desc="How your brand will look in the url"
            {...register("slug", { required: "Required" })}
          />

          <Textarea
            errors={errors?.seo_description}
            register={register}
            required
            requiredMessage="Required"
            label="SEO Description"
            name="seo_description"
          />
        </div>
        <div className="image-section">
          <h5>Brand Image</h5>
          {/* <MiniFileUploader
            control={control}
            accept="image/*"
            setValue={setValue}
            name="image"
          /> */}
          <div className="specs">
            <p>Preffered width and height : 32px(width) X 32px(height)</p>
            <p>Maximum size allowed : 2048KB</p>
            <p>Accepted Formats : .jpeg .png .jpg</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BrandInfo;

const Container = styled.div(
  ({ theme: { breakpoints, primary, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${primary};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .info {
    display:grid;
    grid-template-columns:1fr;
    gap:1rem;
  }
  .image-section {
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    h5 {
      margin-bottom:1rem;
    }
    .specs {
      margin-top:0.5rem;
      font-size:0.8rem;
      text-align:center;
    }
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 2fr 1fr;  
    }
    .info {
      display:grid;
      grid-template-columns:1fr 1fr;
    }
  }
  `
);
