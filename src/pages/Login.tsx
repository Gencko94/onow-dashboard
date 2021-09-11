import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import { useContext } from "react";
import { useTranslation, Trans } from "react-i18next/";
import { LOGIN_FORM } from "../interfaces/auth/auth";
import { AuthProvider } from "../contexts/AuthContext";
import { LoginForm } from "../components/Login/LoginForm";
import { useLogin } from "../hooks/data-hooks/useLogin";

const Login = () => {
  const { t, ready, i18n } = useTranslation(["login"]);
  const { user } = useContext(AuthProvider);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LOGIN_FORM>({});
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  const { mutateAsync } = useLogin();

  const onSubmit = async (data: LOGIN_FORM) => {
    try {
      await mutateAsync({
        password: data.password,
        login: data.login.toLowerCase(),
      });
    } catch (error: any) {
      console.log(error);
      if (
        error.response?.data.error === "Phone Number or Password is Missing"
      ) {
        setError("password", {
          message: t("fields-missing-response"),
        });
        setError("login", {
          message: t("fields-missing-response"),
        });
      } else if (error.response?.data.error === "INVALID_CREDENTIALS") {
        setError("password", {
          message: t("invalid-credentials"),
        });
        setError("login", {
          message: t("invalid-credentials"),
        });
      } else {
        console.log(error.response);
        // show unknown error
      }
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
          <LoginForm
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
          />
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
