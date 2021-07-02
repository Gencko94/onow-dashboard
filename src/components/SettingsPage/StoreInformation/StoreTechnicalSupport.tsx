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
import Button from "../../reusable/Button";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const StoreTechnicalSupport = () => {
  const {
    register,
    formState: { errors },
  } = useForm<STORE_TECHNICAL_SUPPORT>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div>
      <Heading tag="h5" color="primary" margin="2rem 0">
        Technical support
      </Heading>
      <Box>
        <div className="section">
          <Grid cols="repeat(auto-fill,minmax(300px,1fr))" gap="1rem">
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
          </Grid>
        </div>
        <Flex items="center" justify="center" padding="1rem">
          <Button
            text="Save"
            bg="green"
            padding="0.5rem"
            withRipple
            withTransition
          />
        </Flex>
      </Box>
    </div>
  );
};

export default StoreTechnicalSupport;

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
  }
`;
