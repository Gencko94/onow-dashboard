import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdSmartphone } from "react-icons/md";
import styled from "styled-components";
import { STORE_TECHNICAL_SUPPORT } from "../../../interfaces/settings/store-properties/store-properties";
import IconedInput from "../../reusable/IconedInput";

const StoreTechnicalSupport = () => {
  const {
    register,
    formState: { errors },
  } = useForm<STORE_TECHNICAL_SUPPORT>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <div className="title-container">
        <h5>Technical Support</h5>
      </div>
      <Box>
        <div className="section">
          <div className="grid">
            <IconedInput
              Icon={MdSmartphone}
              errors={errors?.phone}
              register={register}
              name="phone"
              required
              requiredMessage="Phone Required"
              label="Phone Number"
            />

            <IconedInput
              Icon={AiOutlineWhatsApp}
              errors={errors?.whatsapp}
              register={register}
              name="whatsapp"
              required
              requiredMessage="Phone Required"
              label="WhatsApp"
            />
            <IconedInput
              Icon={AiOutlineMail}
              errors={errors?.email}
              register={register}
              name="email"
              required
              requiredMessage="Phone Required"
              label="Email Address"
            />
            <IconedInput
              Icon={AiOutlinePhone}
              errors={errors?.landline}
              register={register}
              name="landline"
              required
              requiredMessage="Phone Required"
              label="Landline"
            />
          </div>
        </div>
        <div className="save-container">
          <button>Save Changes</button>
        </div>
      </Box>
    </Container>
  );
};

export default StoreTechnicalSupport;
const Container = styled.div`
  .title-container {
    padding: 2rem 0;
    color: ${(props) => props.theme.mainColor};
  }
`;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  background-color: #fff;
  .section {
    padding: 1rem;
    border-bottom: ${(props) => props.theme.border};
    .section-title {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: ${(props) => props.theme.font.xbold};
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
