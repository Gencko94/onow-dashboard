import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdSmartphone } from "react-icons/md";
import styled from "styled-components";
import {
  STORE_SOCIAL_NETWORK,
  STORE_TECHNICAL_SUPPORT,
} from "../../../interfaces/settings/store-properties/store-properties";

const StoreSocialNetwork = () => {
  const {
    register,
    formState: { errors },
  } = useForm<STORE_SOCIAL_NETWORK>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <div className="title-container">
        <h5>Social network accounts</h5>
      </div>
      <Box>
        <div className="section">
          <div className="grid">
            <div>
              <label>Instagram</label>
              <div className="input-container">
                <span className="link">
                  <p>https://instagram.com/</p>
                </span>
                <input {...register("instagram")} />
              </div>
              <p className="error">{errors?.instagram?.message}</p>
            </div>
            <div>
              <label>Twitter</label>
              <div className="input-container">
                <span className="link">
                  <p>https://www.twitter.com/</p>
                </span>
                <input {...register("twitter")} />
              </div>
              <p className="error">{errors?.twitter?.message}</p>
            </div>
            <div>
              <label>Snapchat</label>

              <div className="input-container">
                <span className="link">
                  <p>https://www.snapchat.com/add/</p>
                </span>
                <input {...register("snapchat", { required: "Required" })} />
              </div>
              <p className="error">{errors?.snapchat?.message}</p>
            </div>
            <div>
              <label>Facebook</label>

              <div className="input-container">
                <span className="link">
                  <p>https://www.facebook.com/</p>
                </span>
                <input {...register("facebook", { required: "Required" })} />
              </div>

              <p className="error">{errors?.facebook?.message}</p>
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

export default StoreSocialNetwork;
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
      .link {
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.subHeading};
        font-size: 0.9rem;
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
    padding: 1rem;
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
