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
            <div>
              <label>Phone Number</label>
              <div className="input-container">
                <span className="icon">
                  <MdSmartphone size={20} />
                </span>
                <input {...register("phone", { required: "Required" })} />
              </div>
              <p className="error">{errors?.phone?.message}</p>
            </div>
            <div>
              <label>Whatsapp</label>
              <div className="input-container">
                <span className="icon">
                  <AiOutlineWhatsApp size={20} />
                </span>
                <input {...register("whatsapp", { required: "Required" })} />
              </div>
              <p className="error">{errors?.whatsapp?.message}</p>
            </div>
            <div>
              <label>Email Address</label>

              <div className="input-container">
                <span className="icon">
                  <AiOutlineMail size={20} />
                </span>
                <input {...register("email", { required: "Required" })} />
              </div>
              <p className="error">{errors?.email?.message}</p>
            </div>
            <div>
              <label>Landline</label>

              <div className="input-container">
                <span className="icon">
                  <AiOutlinePhone size={20} />
                </span>
                <input {...register("landline", { required: "Required" })} />
              </div>

              <p className="error">{errors?.landline?.message}</p>
            </div>
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
  padding: 1rem;
  background-color: #fff;
  .section {
    .section-title {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: ${(props) => props.theme.font.xbold};
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: ${(props) => props.theme.headingColor};
      font-weight: ${(props) => props.theme.font.light};
    }

    .error {
      height: 20px;
      font-size: 0.7rem;
      padding-top: 0.25rem;
      color: ${(props) => props.theme.dangerRed};
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      .input-container {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: ${(props) => props.theme.inputColorLight};
        color: ${(props) => props.theme.headingColor};
        border: ${(props) => props.theme.border};
        border-radius: 5px;
      }
      .icon {
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.subHeading};
      }
      input {
        flex: 1;
        padding: 0.4rem;
        font-size: 0.9rem;
        width: 50px;
        background-color: #fff;
      }
    }
    .store-headquarters {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
      input.input {
        flex: 1;
        padding: 0.4rem;
        font-size: 0.9rem;
        width: 100%;
        background-color: #fff;
        border: ${(props) => props.theme.border};
        border-radius: 6px;
      }
    }
  }
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
