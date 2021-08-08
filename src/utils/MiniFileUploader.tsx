import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import convertUrlToFile from "./convertUrlToFile";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Flex, { FlexWrapper } from "../components/StyledComponents/Flex";
import Button from "../components/reusable/Button";
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
interface IProps {
  accept: ".png, .jpg, .jpeg" | ".png" | ".jpg" | ".jpeg";
  image: File | string;
  maxFileSizeInBytes?: number;
  onChange: (file: File) => void;
  onRemove?: () => void;
  progress?: number | null;
}
const MiniFileUploader = ({
  accept,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  onChange,
  onRemove,
  image,
  progress,
}: IProps) => {
  console.log(progress);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Image Validation
  const addFilesAndValidate = (files: FileList) => {
    let addedImage;
    for (let file of Array.from(files)) {
      if (file.size <= maxFileSizeInBytes) {
        addedImage = file;
      }
    }
    return addedImage;
  };

  const handleAddNewFiles = (
    files: FileList | null,
    cb: (file: File) => void
  ) => {
    if (files?.length) {
      const addedImage = addFilesAndValidate(files);

      cb(addedImage!);
    }
  };
  const removeImage = () => {
    onRemove?.();
  };
  useEffect(() => {
    if (typeof image === "string") {
      convertUrlToFile(image).then((image) => setFile(image));
    } else {
      setFile(image);
    }
  }, [image]);

  return (
    <div>
      <DragFileInputContainer>
        <div className="img-preview">
          {!image && !progress && (
            <>
              <img
                className="upload-img"
                src="/images/upload.png"
                alt="upload"
              />
              <DragDropText>Drag and drop here</DragDropText>
            </>
          )}
          {file && progress === null && (
            <FilePreviewContainer>
              <PreviewContainer>
                <ImagePreview src={URL.createObjectURL(file)} />
              </PreviewContainer>
            </FilePreviewContainer>
          )}
          {progress && progress !== 0 && (
            <FilePreviewContainer>
              <ProgressContainer>
                <CircularProgressbar
                  strokeWidth={2}
                  value={progress}
                  maxValue={100}
                  styles={buildStyles({
                    pathColor: "#f78f21",
                    textSize: "0.7rem",
                    textColor: "#f78f21",
                  })}
                  text={`${progress}% Uploaded`}
                />
              </ProgressContainer>
            </FilePreviewContainer>
          )}
        </div>

        <DragInput
          accept={accept}
          type="file"
          onChange={(e) => {
            handleAddNewFiles(e.target.files, onChange);
          }}
          ref={(e: any) => {
            inputRef.current = e;
          }}
        />
      </DragFileInputContainer>
      {!image && (
        <Flex justify="center" margin="1rem 0">
          <Button
            color="green"
            withTransition
            onClick={() => {
              inputRef?.current?.click();
            }}
          >
            Upload
          </Button>
        </Flex>
      )}
      {image && (
        <Flex justify="center" margin="1rem 0">
          <Button
            color="green"
            withTransition
            onClick={() => {
              inputRef?.current?.click();
            }}
          >
            Change
          </Button>
          {onRemove && (
            <Button
              color="danger"
              margin="0 0.5rem"
              withTransition
              onClick={() => {
                removeImage();
              }}
            >
              Remove
            </Button>
          )}
        </Flex>
      )}
    </div>
  );
};

export default MiniFileUploader;
const DragFileInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img-preview {
    height: 250px;
    width: 250px;
    border: 2px dashed rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  .upload-img {
    width: 70px;
    height: 100px;
  }
`;
const DragInput = styled.input`
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;
const DragDropText = styled.p`
  font-weight: ${(props) => props.theme.font.semibold};
  /* letter-spacing: 1.5px; */
  font-size: 0.9rem;
  margin-top: 0;
  text-align: center;
`;

const FilePreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const ProgressContainer = styled(FlexWrapper)`
  padding: 4rem;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
`;
const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  /* overflow: hidden; */
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
