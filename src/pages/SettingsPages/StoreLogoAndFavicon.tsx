import { useContext } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Hr from "../../components/StyledComponents/Hr";
import { AuthProvider } from "../../contexts/AuthContext";

import useToast from "../../hooks/useToast";
import { STORE_IDENTITY } from "../../interfaces/settings/store-identity/store-identity";
import extractError from "../../utils/extractError";
import MiniFileUploader from "../../utils/MiniFileUploader";
import { uploadFile } from "../../utils/uploadFile";

const StoreLogoAndFavicon = () => {
  const { user } = useContext(AuthProvider);

  const queryClient = useQueryClient();
  const { control, setValue } = useForm<STORE_IDENTITY>({
    defaultValues: {
      logo: user!.store.logo,
      favicon: user!.store.favicon,
    },
  });
  const { handleCloseToast, setToastStatus } = useToast();
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [iconProgress, setIconProgress] = useState<number | null>(null);

  // Upload Logic
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
      // Update Logo Form value
      setValue("logo", file);

      // Update the store logo in the background.
      queryClient.invalidateQueries("auth");
      // Show success toast
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Logo Updated Successfully",
        type: "success",
      });
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
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
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Favicon Updated Successfully",
        type: "success",
      });
    } catch (error) {
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
          children={[
            {
              name: { ar: "الإعدادات", en: "Settings" },
              target: "/settings",
            },
            {
              name: { ar: "شعار المتجر", en: "Store Logo & Favicon" },
              target: "",
            },
          ]}
        />
      </HeaderContainer>
      <Container>
        <div className="section">
          <Heading tag="h5" color="primary">
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
          <Heading tag="h5" color="primary">
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

export default StoreLogoAndFavicon;
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
