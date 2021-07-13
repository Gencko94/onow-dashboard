import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Hr from "../../components/StyledComponents/Hr";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useToast from "../../hooks/useToast";
import { STORE_IDENTITY } from "../../interfaces/settings/store-identity/store-identity";
import extractError from "../../utils/extractError";
import MiniFileUploader from "../../utils/MiniFileUploader";
import { uploadFile } from "../../utils/uploadFile";

const StoreIdentity = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<STORE_IDENTITY>();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [iconProgress, setIconProgress] = useState<number | null>(null);
  const handleUploadLogo = async (file: File) => {
    try {
      await uploadFile({
        file,
        href: "/store-logo",
        key: "logo",
        method: "POST",
        onProgress: setLogoProgress,
      });
      setLogoProgress(null);
      setValue("logo", file);
      // handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Logo Updated Successfully",
        type: "success",
      });
    } catch (error) {
      // handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const handleUploadIcon = async (file: File) => {
    try {
      await uploadFile({
        file,
        href: "/store-favicon",
        key: "favicon",
        method: "POST",
        onProgress: setLogoProgress,
      });
      setIconProgress(null);
      setValue("favicon", file);
      // handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Favicon Updated Successfully",
        type: "success",
      });
    } catch (error) {
      // handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
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
        <div className="section">
          <Heading tag="h4" color="primary" margin="1rem 0">
            Store Logo
          </Heading>
          <Box>
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
                      onChange={handleUploadLogo}
                      onRemove={() => {}}
                      accept=".png, .jpg, .jpeg"
                      progress={logoProgress}
                    />
                  );
                }}
              />
            </Grid>
            <div className="demo-container">
              <img src="/images/logo_helper.png" alt="" />
            </div>
          </Box>
        </div>
        <Hr />
        <div className="section">
          <Heading tag="h4" color="primary" margin="1rem 0">
            Store Favicon
          </Heading>
          <Box>
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
                      onChange={handleUploadIcon}
                      progress={iconProgress}
                      accept=".png, .jpg, .jpeg"
                    />
                  );
                }}
              />
              <div className="demo-container">
                <img src="/images/icon_helper.png" alt="" />
              </div>
            </Grid>
          </Box>
        </div>
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
  padding: 1rem;
  .section {
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
