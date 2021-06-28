import { useForm } from "react-hook-form";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
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
      <Breadcrumbs
        childLabel="Store Identity"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <Container>
        <div className="title-container">
          <h5>Store Logo & Favicon</h5>
        </div>
        <Box>
          <div className="section">
            <h5 className="section-title">Store Logo</h5>
            <Grid>
              <div className="specs">
                <p>
                  Preffered width and height : 1024px(width) X 256px(height)
                </p>
                <p>Maximum size allowed : 2048KB</p>
                <p>Accepted Formats : .jpeg .png .jpg .svg</p>
              </div>
              {/* <MiniFileUploader
                control={control}
                accept="image/*"
                setValue={setValue}
                name="logo"
              /> */}
              <div className="demo-container">
                <img src="/images/logo_helper.png" alt="" />
              </div>
            </Grid>
          </div>
          <Hr />
          <div className="section">
            <h5 className="section-title">Store Favicon</h5>
            <Grid>
              <div className="specs">
                <p>Preffered width and height : 32px(width) X 32px(height)</p>
                <p>Maximum size allowed : 2048KB</p>
                <p>Accepted Formats : .jpeg .png .jpg</p>
              </div>
              {/* <MiniFileUploader
                control={control}
                accept="image/*"
                setValue={setValue}
                name="icon"
              /> */}
              <div className="demo-container">
                <img src="/images/icon_helper.png" alt="" />
              </div>
            </Grid>
          </div>
          <div className="save-container">
            <button>Save Changes</button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default StoreIdentity;
const Container = styled.div`
  .title-container {
    padding: 2rem 0;
    color: ${(props) => props.theme.mainColor};
  }
`;
const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  /* padding: 1rem; */
  background-color: #fff;
  .section {
    padding: 1rem;
    .section-title {
      margin-bottom: 1rem;
    }
  }
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-top: ${(props) => props.theme.border};
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
const Grid = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  gap: 1rem;
  .demo-container {
    grid-column:1/3;
  }
  .specs {
    font-size: 0.8rem;
  }
  @media ${breakpoints.md}{
    grid-template-columns: 0.5fr 275px 1fr;
    .demo-container {
      grid-column:unset;
    }

  }
  `
);
