import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { STORE_SOCIAL_NETWORK } from "../../../interfaces/settings/store-properties/store-properties";
import Button from "../../reusable/Button";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const StoreSocialNetwork = () => {
  const {
    register,
    formState: { errors },
  } = useForm<STORE_SOCIAL_NETWORK>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div>
      <Heading tag="h5" color="primary" margin="2rem 0">
        Social network accounts
      </Heading>

      <Box>
        <div className="section">
          <Grid cols="repeat(auto-fill,minmax(300px,1fr))" gap="1rem">
            <PrefixedInput
              label="Instagram"
              errors={errors.instagram}
              name="instagram"
              prefixText="https://instagram.com/"
              register={register}
            />
            <PrefixedInput
              label="Twitter"
              errors={errors.twitter}
              name="twitter"
              prefixText="https://www.twitter.com/"
              register={register}
            />
            <PrefixedInput
              label="Snapchat"
              errors={errors.snapchat}
              name="snapchat"
              prefixText="https://www.snapchat.com/add/"
              register={register}
            />
            <PrefixedInput
              label="Facebook"
              errors={errors.facebook}
              name="facebook"
              prefixText="https://www.facebook.com/"
              register={register}
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

export default StoreSocialNetwork;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  background-color: #fff;
  .section {
    padding: 1rem;
    border-bottom: ${(props) => props.theme.border};
  }
`;
