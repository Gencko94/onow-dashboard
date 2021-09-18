import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import { useContext } from "react";
import { useTranslation, Trans } from "react-i18next/";
import { AuthProvider } from "../contexts/AuthContext";
import { LoginForm } from "../components/Login/LoginForm";

const Login = () => {
  const { ready, i18n } = useTranslation(["login"]);
  const { user } = useContext(AuthProvider);

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Wrapper>
      <div></div>
      <Container>
        <ContentWrapper>
          <Header>
            <LogoContainer to="/">
              <img src="/images/logo.svg" alt="logo" />
            </LogoContainer>
          </Header>
          <LoginForm />
          <Footer>
            <Text>
              <Trans i18nKey="login:no-account">
                Don't have an account ?
                <InlineLink to="/register">Register here</InlineLink>
              </Trans>
            </Text>
            <Text>
              <Trans i18nKey="login:forgot-password">
                Forgot Password ?
                <InlineLink to="/register">Reset Here</InlineLink>
              </Trans>
            </Text>
          </Footer>
        </ContentWrapper>

        <LanguageContainer>
          <>
            {i18n.language === "ar" && (
              <Icon onClick={() => changeLanguage("en")}>English</Icon>
            )}
            {i18n.language === "en" && (
              <Icon onClick={() => changeLanguage("ar")}>العربية</Icon>
            )}
          </>
        </LanguageContainer>
      </Container>
    </Wrapper>
  );
};

export default Login;
const Wrapper = styled.div(
  ({ theme: { breakpoints } }) => `
  display:grid;
  grid-template-columns:2fr 1fr;
  

`
);
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.subtleFloating};
  /* font-family: ${(props) => props.theme.fontFamily}; */
`;

const ContentWrapper = styled.div`
  width: 90%;
  /* max-width: 90%; */
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;
const LogoContainer = styled(Link)`
  display: block;
  width: 150px;
  height: 150px;
  display: flex;

  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  padding: 0.5rem;
  text-align: center;
`;
const Text = styled.p`
  font-size: 0.8rem;
  font-weight: ${(props) => props.theme.font.regular};
`;

const LanguageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
`;

const Icon = styled.button`
  color: ${(props) => props.theme.text};
`;

const InlineLink = styled(Link)`
  color: ${(props) => props.theme.dangerRed};
  font-weight: ${(props) => props.theme.font.regular};
  text-decoration: underline;
`;
