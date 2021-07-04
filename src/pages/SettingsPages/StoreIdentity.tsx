import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Hr from "../../components/StyledComponents/Hr";
import { STORE_IDENTITY } from "../../interfaces/settings/store-identity/store-identity";
import MiniFileUploader from "../../utils/MiniFileUploader";

const StoreIdentity = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<STORE_IDENTITY>();
  return (
    <div>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Store Identity"
          parentLabel="Settings"
          parentTarget="/settings"
        />
      </HeaderContainer>
      <Container>
        {/* <Heading tag="h5" color="primary" margin="1rem 0">
          Store Logo & Favicon
        </Heading> */}
        <Box>
          <div className="section">
            <h5 className="section-title">Store Logo</h5>
            <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
              <div className="specs">
                <p>
                  Preffered width and height : 1024px(width) X 256px(height)
                </p>
                <p>Maximum size allowed : 2048KB</p>
                <p>Accepted Formats : .jpeg .png .jpg .svg</p>
              </div>
              <Controller
                control={control}
                name="logo"
                render={({ field: { onChange, value } }) => {
                  return (
                    <MiniFileUploader
                      image={value}
                      onChange={() => {}}
                      onRemove={() => {}}
                      accept=".png, .jpg, .jpeg"
                    />
                  );
                }}
              />
            </Grid>
            <div className="demo-container">
              <img src="/images/logo_helper.png" alt="" />
            </div>
          </div>
          <Hr />
          <div className="section">
            <h5 className="section-title">Store Favicon</h5>
            <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="1rem">
              <div className="specs">
                <p>Preffered width and height : 32px(width) X 32px(height)</p>
                <p>Maximum size allowed : 2048KB</p>
                <p>Accepted Formats : .jpeg .png .jpg</p>
              </div>
              <Controller
                control={control}
                name="favicon"
                render={({ field: { onChange, value } }) => {
                  return (
                    <MiniFileUploader
                      image={value}
                      onChange={() => {}}
                      onRemove={() => {}}
                      accept=".png, .jpg, .jpeg"
                    />
                  );
                }}
              />
              <div className="demo-container">
                <img src="/images/icon_helper.png" alt="" />
              </div>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default StoreIdentity;
const Container = styled.div``;
const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  margin: 1rem 0;
  background-color: #fff;
  .section {
    padding: 1rem;
    .section-title {
      margin-bottom: 1rem;
    }
  }
`;
// const Grid = styled.div(
//   ({ theme: { breakpoints } }) => `
//   display: grid;
//   grid-template-columns: 0.5fr 0.5fr;
//   gap: 1rem;
//   .demo-container {
//     grid-column:1/3;
//   }
//   .specs {
//     font-size: 0.8rem;
//   }
//   @media ${breakpoints.md}{
//     grid-template-columns: 0.5fr 275px 1fr;
//     .demo-container {
//       grid-column:unset;
//     }

//   }
//   `
// );
