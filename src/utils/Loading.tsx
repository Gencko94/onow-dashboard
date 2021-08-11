import React from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import SvgLogo from "../components/SvgLogo/SvgLogo";
import styled from "styled-components";
nprogress.configure({ showSpinner: false });
export default function Loading() {
  React.useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return (
    <Container>
      <SvgLogo />
    </Container>
  );
}
const Container = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;
