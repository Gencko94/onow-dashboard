import { useRef } from "react";
import styled from "styled-components";
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
interface IProps {
  accept: ".png, .jpg, .jpeg" | ".png" | ".jpg" | ".jpeg";
  onChange: (file: File | File[]) => void;
  multiple?: boolean;
  maxFileSizeInBytes?: number;
}
const FileUploader = ({
  multiple,
  onChange,
  accept,

  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
}: IProps) => {
  // const formImages = watch?.(name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Image Validation
  function addFilesAndValidate(files: FileList) {
    let images = [];
    for (let file of Array.from(files)) {
      if (file.size <= maxFileSizeInBytes) {
        if (!multiple) {
          return file;
        }
        images.push(file);
      }
    }
    return images;
  }
  const handleAddNewFiles = (
    files: FileList | null,
    cb: (files: File | File[]) => void
  ) => {
    // console.log(files);
    if (files?.length) {
      const file = addFilesAndValidate(files);
      // const allFiles = { ...images, ...newFiles };
      // setImages(allFiles);
      // const fileArray = convertNestedObjectToArray(allFiles);
      cb(file);
    }
  };

  return (
    <Container>
      <DragFileInputContainer>
        <img className="upload-img" src="/images/upload.png" alt="upload" />
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <button
          className="upload-btn"
          type="button"
          onClick={() => {
            inputRef?.current?.click();
          }}
        >
          Browse Files
        </button>

        <DragInput
          multiple={multiple}
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
    </Container>
  );
};

export default FileUploader;
const Container = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr; */
  background-color: #fff;

  border-radius: 6px;
`;
const DragFileInputContainer = styled.div`
  position: relative;
  border: ${(props) => props.theme.border};
  border-style: dashed;
  border-width: 2px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.overlayColor};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .upload-img {
    width: 70px;
    height: 100px;
  }
  .upload-btn {
    z-index: 10;
    position: relative;
    padding: 0.5rem;
    color: #fff;
    border-radius: 5px;
    margin: 0.5rem 0;
    background-color: ${(props) => props.theme.green};
  }
  .desc {
    font-size: 0.8rem;
    text-align: center;
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
