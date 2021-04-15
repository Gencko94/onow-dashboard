import { useRef, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
const convertBytesToKB = (bytes: number) => Math.round(bytes / 1000);
interface IProps {
  accept: string;
  control: Control<any> | undefined;
  multiple: boolean;
  maxFileSizeInBytes?: number;
  setValue?: UseFormSetValue<any> | undefined;
}
const FileUploader = ({
  multiple,
  control,
  accept,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  setValue,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<{ [key: string]: File }>({});

  const convertNestedObjectToArray = (obj: { [key: string]: File }): File[] => {
    return Object.keys(obj).map(key => obj[key]);
  };

  // Image Validation
  const addFilesAndValidate = (files: FileList) => {
    const addedImages: { [key: string]: File } = {};
    for (let file of Array.from(files)) {
      if (file.size <= maxFileSizeInBytes) {
        if (!multiple) {
          return { file };
        }
        addedImages[file.name] = file;
      }
    }
    return { ...addedImages };
  };
  const handleAddNewFiles = (
    files: FileList | null,
    cb: (files: File[]) => void
  ) => {
    if (files?.length) {
      const newFiles = addFilesAndValidate(files);
      const allFiles = { ...images, ...newFiles };
      setImages(allFiles);
      const fileArray = convertNestedObjectToArray(allFiles);
      cb(fileArray);
    }
  };
  const removeImage = (fileName: string) => {
    delete images[fileName];
    setImages({ ...images });
    setValue?.('image', convertNestedObjectToArray({ ...images }));
  };
  return (
    <Container>
      <DragFileInputContainer>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <UploadFileButton
          type="button"
          onClick={() => {
            inputRef?.current?.click();
          }}
        >
          Browse Files
        </UploadFileButton>
        <Controller
          control={control}
          name="image"
          rules={{ required: 'Required' }}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <DragInput
                multiple={multiple}
                accept={accept}
                type="file"
                onChange={e => {
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
      <FilePreviewContainer>
        <PreviewList>
          {convertNestedObjectToArray(images).map(file => {
            return (
              <PreviewContainer>
                <ImagePreview src={URL.createObjectURL(file)} />
                <ImageMetaData>
                  <p>{file.name}</p>
                  <div className="flex">
                    <p>{convertBytesToKB(file.size)} kb</p>
                    <button
                      type="button"
                      onClick={() => {
                        removeImage(file.name);
                      }}
                    >
                      <RiDeleteBinLine size={22} />
                    </button>
                  </div>
                </ImageMetaData>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </Container>
  );
};

export default FileUploader;
const Container = styled.div``;
const DragFileInputContainer = styled.div`
  position: relative;
  border: ${props => props.theme.border};
  border-radius: 5px;
  background-color: ${props => props.theme.overlayColor};
  padding: 35px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  font-weight: ${props => props.theme.font.semibold};
  letter-spacing: 1.5px;
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
  background-color: ${props => props.theme.green};
`;
const FilePreviewContainer = styled.div`
  margin: 1rem 0;
`;
const PreviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
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
  font-weight: ${props => props.theme.font.bold};
  background-color: rgba(5, 5, 5, 0.55);
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
