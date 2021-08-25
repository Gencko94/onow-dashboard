import styled from "styled-components";

const Hr = ({ m = "1.5" }: { m?: string }) => {
  return <Container m={m} />;
};

export default Hr;
const Container = styled.hr<{ m: string }>(
  ({ theme: { textAlt }, m }) => `
margin: ${`${m}rem 0 `};

  background-image: linear-gradient(
    90deg,
    transparent,
    ${textAlt},
    transparent
    );
    background-color: transparent;
    border: none;
    height: 1px;
    opacity: 0.5;
    
    `
);
