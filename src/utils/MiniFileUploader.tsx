import { useRef, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
const convertBytesToKB = (bytes: number) => Math.round(bytes / 1000);
interface IProps {
  accept: string;
  control: Control<any> | undefined;
  name: string;
  maxFileSizeInBytes?: number;
  setValue?: UseFormSetValue<any> | undefined;
}
const MiniFileUploader = ({
  control,
  accept,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  setValue,
  name,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);

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
      setImage(addedImage!);
      //   const fileArray = convertNestedObjectToArray(allFiles);
      cb(addedImage!);
    }
  };
  const removeImage = () => {
    setImage(null);
    setValue?.(name, undefined);
  };
  return (
    <Container>
      <DragFileInputContainer>
        <div className="img-preview">
          {!image && <DragDropText>Drag and drop here</DragDropText>}
          {image && (
            <FilePreviewContainer>
              {/* <PreviewList> */}
              <PreviewContainer>
                <ImagePreview src={URL.createObjectURL(image)} />
                <ImageMetaData>
                  <p>{image?.name}</p>
                  <div className="flex">
                    <p>{convertBytesToKB(image!.size)} kb</p>
                    <button
                      type="button"
                      onClick={() => {
                        removeImage();
                      }}
                    >
                      <RiDeleteBinLine size={22} />
                    </button>
                  </div>
                </ImageMetaData>
              </PreviewContainer>

              {/* </PreviewList> */}
            </FilePreviewContainer>
          )}
        </div>
        {/* {!image && (
          <UploadFileButton
            type="button"
            onClick={() => {
              inputRef?.current?.click();
            }}
          >
            Browse Files
          </UploadFileButton>
        )} */}
        <Controller
          control={control}
          name={name}
          rules={{ required: "Required" }}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <DragInput
                accept={accept}
                type="file"
                onChange={(e) => {
                  handleAddNewFiles(e.target.files, onChange);
                }}
                ref={(e: any) => {
                  ref = e;
                  inputRef.current = e;
                }}
              />
            </>
          )}
        />
      </DragFileInputContainer>
    </Container>
  );
};

export default MiniFileUploader;
const Container = styled.div``;
const DragFileInputContainer = styled.div`
  position: relative;
  /* border: ${(props) => props.theme.border}; */
  /* border-radius: 5px; */
  /* padding: 1rem; */
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
const UploadFileButton = styled.button`
  z-index: 10;
  position: relative;
  padding: 0.5rem;
  color: #fff;
  border-radius: 5px;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.green};
`;
const FilePreviewContainer = styled.div`
  /* margin: 1rem 0; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  overflow: hidden;
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImageMetaData = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-weight: ${(props) => props.theme.font.bold};
  background-color: rgba(5, 5, 5, 0.35);
  font-size: 0.8rem;
  p {
    flex: 1;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
