import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
const ProductDescription = () => {
  return (
    <Container>
      <Title>Product Description</Title>
      <InputsContainer>
        <InputContainer>
          <Label>Short Description English</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>Short Description Arabic</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>Long Description Arabic</Label>
          <Editor
            apiKey="h8lccius12zhbsmpw3gfatjp0wdu64d6jmoe5s9cd9yu9uau"
            initialValue="<p>Initial content</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar:
                // eslint-disable-next-line no-multi-str
                'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent',
            }}
            // onChange={this.handleEditorChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Long Description English</Label>
          <Editor
            apiKey="h8lccius12zhbsmpw3gfatjp0wdu64d6jmoe5s9cd9yu9uau"
            initialValue="<p>Initial content</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar:
                // eslint-disable-next-line no-multi-str
                'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent',
            }}
            // onChange={this.handleEditorChange}
          />
        </InputContainer>
      </InputsContainer>
    </Container>
  );
};

export default ProductDescription;
const Container = styled.div``;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;
const InputContainer = styled.div``;

const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  display: inline-block;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: ${props => props.theme.btnBorder};
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  font-size: 0.9rem;
  border-radius: 5px;
  background-color: ${props => props.theme.inputColorLight};
  color: ${props => props.theme.headingColor};
`;
