import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcOk } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Box from "../../components/reusable/Box/Box";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Spacer from "../../components/reusable/Spacer";
import Flex from "../../components/StyledComponents/Flex";

import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Paragraph from "../../components/StyledComponents/Paragraph";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import FileUploader from "../../utils/FileUploader";
import MiniFileUploader from "../../utils/MiniFileUploader";
import {
  getStoreLayoutSettings,
  updateStoreLayoutSettings,
} from "../../utils/queries/settingsQueries";

const HeaderType = () => {
  const { data } = useQuery("store-layout", getStoreLayoutSettings, {
    suspense: true,
  });
  const [images, setImages] = useState<File[]>([]);
  const [headerType, setHeaderType] = useState<"photo" | "video" | "slider">(
    data!.header_type
  );
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { mutateAsync } = useMutation(updateStoreLayoutSettings);
  const onRemove = async (image: File) => {
    handleCloseConfirmationModal?.();
  };

  return (
    <Container>
      <Flex margin="1rem 0" items="center" justify="space-between">
        <div>
          <Heading tag="h2" type="large-title">
            Header Type
          </Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "مظهر الموقع", en: "Theme & Appearance" },
                target: "/website-appearance/theme-appearance",
              },
              {
                name: { ar: "خصائص الرأسية", en: "Header Type" },
                target: "",
              },
            ]}
          />
        </div>
        <Button type="submit" color="primary">
          Save Changes
        </Button>
      </Flex>
      <Spacer size={40} />
      <Box type="titled" boxTitle="Select your preffered Header type">
        <Grid gap="1rem" columns="repeat(auto-fit,minmax(275px,1fr))">
          <Card
            active={headerType === "photo"}
            onClick={() => {
              setHeaderType("photo");
            }}
          >
            <Flex justify="center" padding=" 0" items="center">
              <Heading tag="h6" type="small-title">
                Single Photo
              </Heading>
              <Spacer size={10} />

              {headerType === "photo" ? (
                <FcOk
                  size={20}
                  // style={{ cursor: "pointer" }}
                />
              ) : (
                <RiCheckboxBlankCircleLine
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHeaderType("photo");
                  }}
                  size={20}
                />
              )}
            </Flex>
            <Paragraph fontSize="0.9rem" align="center">
              Header will show a single photo
            </Paragraph>
          </Card>
          <Card
            active={headerType === "slider"}
            onClick={() => {
              setHeaderType("slider");
            }}
          >
            <Flex justify="center" items="center">
              <Heading tag="h6" type="small-title">
                Slideshow
              </Heading>
              <Spacer size={10} />

              {headerType === "slider" ? (
                <FcOk size={20} />
              ) : (
                <RiCheckboxBlankCircleLine
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHeaderType("slider");
                  }}
                  size={20}
                />
              )}
            </Flex>
            <Paragraph fontSize="0.9rem" align="center">
              Header will play images slideshow
            </Paragraph>
          </Card>
          {/* TODO : Implement Video */}
          {/* <Card
            active={headerType === "video"}
            onClick={() => {
              setHeaderType("video");
            }}
          >
            <Flex justify="center" items="center">
              <Heading tag="h6" type="small-title">
                Video
              </Heading>
              <Spacer size={10} />
              {headerType === "video" ? (
                <FcOk size={20} />
              ) : (
                <RiCheckboxBlankCircleLine
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHeaderType("video");
                  }}
                  size={20}
                />
              )}
            </Flex>
            <Paragraph fontSize="0.9rem" align="center">
              Header will play a video
            </Paragraph>
          </Card> */}
        </Grid>
      </Box>
      <Spacer size={40} />
      {headerType === "photo" && (
        <MiniFileUploader
          accept=".png, .jpg, .jpeg"
          image={data!.photo_url as string}
          onChange={(file) => {}}
        />
      )}
      <PreviewContainer>
        <Grid columns="repeat(auto-fill,minmax(400px,1fr))" gap="1rem">
          {images.map((image, index) => {
            return (
              <div className="img-preview">
                <img src={URL.createObjectURL(image)} alt={`i-${index}`} />

                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    setConfirmationModalStatus?.({
                      closeCb: handleCloseConfirmationModal!,
                      desc: "Are you sure you want to remove this image ?",
                      title: "Remove Image",
                      open: true,
                      successCb: () => onRemove(image),
                    });
                  }}
                >
                  <IoMdCloseCircle size={35} />
                </button>
              </div>
            );
          })}
        </Grid>
      </PreviewContainer>

      {headerType === "slider" && (
        <FileUploader
          accept=".png, .jpg, .jpeg"
          onChange={(file: File | File[]) => {
            if (!Array.isArray(file)) {
              setImages((prev) => [...prev, file]);
            }
          }}
        />
      )}
    </Container>
  );
};

export default HeaderType;
const Container = styled.div`
  .desc {
    padding: 0.5rem;
    background-color: ${(props) => props.theme.accent3};
    border-radius: 6px;
    border: ${(props) => props.theme.border};
    margin: 1rem 0;
  }
`;

const PreviewContainer = styled.div(
  ({ theme: { breakpoints, green, dangerRed, border } }) => `
    padding:1rem;
    .img-preview {
      position:relative;
      border-radius:6px;
      border:${border};
      img {
        width:100%;
        object-fit:contain;
        max-height:200px;
        min-height:200px;
        object-position:center;
        border-bottom:${border};
      }
      .default-container {
        p {
          font-size:0.9rem;
        }
        span {
          margin: 0 0.25rem;
          color:${green};
          display:flex;
          align-items:center;
        }
      }
      .remove {
        position: absolute;
        top: -10px;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${dangerRed};
      }
    }
    `
);
const Card = styled.div<{ active: boolean }>`
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? props.theme.background : props.theme.subtleBackground};
  &:hover {
    background-color: ${(props) => props.theme.background};
  }
  border: ${(props) => props.theme.border};
`;
