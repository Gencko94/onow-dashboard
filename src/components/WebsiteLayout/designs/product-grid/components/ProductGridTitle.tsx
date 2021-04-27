import styled from 'styled-components';

interface IProps {
  ctaEnabled: boolean;
  title: string;
  backgroundColor: string;
  textColor: string;
  btnText: string;
}

const ProductGridTitle = ({
  ctaEnabled,
  title,
  backgroundColor,
  textColor,
  btnText,
}: IProps) => {
  return (
    <Container>
      <h5 className="title">{title}</h5>
      {ctaEnabled && (
        <Button bg={backgroundColor} textColor={textColor} className="btn">
          {btnText}
        </Button>
      )}
    </Container>
  );
};

export default ProductGridTitle;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
const Button = styled.button<{ bg: string; textColor: string }>`
  padding: 0.25rem 0.65rem;
  font-size: 0.9rem;

  background-color: ${props => props.bg};
  color: ${props => props.textColor};
  border-radius: 5px;
`;
