import { useRef, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
import Button from "./Button";
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
const convertBytesToKB = (bytes: number) => Math.round(bytes / 1000);
interface IProps {
  accept: string;
  onChange: (file: File) => void;
  maxFileSizeInBytes?: number;
  setValue?: UseFormSetValue<any> | undefined;
  label: string;
}
const InlineFileUploader = ({
  accept,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  setValue,
  onChange,
  label,
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

      cb(addedImage!);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
  return (
    <Container>
      <label>{label}</label>
      <InputContainer>
        <div className="fake-input">
          <p>Choose File to upload</p>
          <Input
            accept={accept}
            type="file"
            onChange={(e) => {
              handleAddNewFiles(e.target.files, onChange);
            }}
            ref={(e: any) => {
              inputRef.current = e;
            }}
          />
        </div>
        <Button
          withTransition
          onClick={() => {
            inputRef?.current?.click();
          }}
          color="green"
        >
          Browse files
        </Button>
      </InputContainer>

      {image && (
        <FilePreviewContainer>
          <div className="file">
            <img src={URL.createObjectURL(image)} alt="upload" />
            <ImageMetaData>
              <div>
                <p>{image?.name}</p>
                <p>{convertBytesToKB(image!.size)} kb</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  removeImage();
                }}
              >
                <RiDeleteBinLine size={22} />
              </button>
            </ImageMetaData>
          </div>
        </FilePreviewContainer>
      )}
    </Container>
  );
};

export default InlineFileUploader;
const Container = styled.div`
  label {
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  .fake-input {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.9rem;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
    background-color: #fff;
    position: relative;
  }
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  gap: 1rem;
  .img-preview {
  }
`;
const Input = styled.input`
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

const FilePreviewContainer = styled.div`
  margin-top: 1rem;
  .file {
    background-color: ${(props) => props.theme.subtleBackground};

    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 1rem;
    padding: 0.5rem;
    border: ${(props) => props.theme.border};
    border-radius: 6px;

    position: relative;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }
`;

const ImageMetaData = styled.div`
  justify-content: space-between;
  display: flex;

  font-weight: ${(props) => props.theme.font.bold};
  font-size: 0.8rem;
  p {
    /* flex: 1; */
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.dangerRed};
  }
`;
