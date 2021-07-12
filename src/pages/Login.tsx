import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { MdMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useContext, useState } from "react";
import { useTranslation, Trans } from "react-i18next/";
import { LOGIN_FORM } from "../interfaces/auth/auth";
import { useMutation, useQueryClient } from "react-query";
import { userLogin } from "../utils/queries";
import { AuthProvider } from "../contexts/AuthContext";
import * as Yup from "yup";
import Button from "../components/reusable/Button";
import IconedInput from "../components/reusable/Inputs/IconedInput";
import PasswordInput from "../components/reusable/Inputs/PasswordInput";

const Login = () => {
  const { t, ready, i18n } = useTranslation(["login"]);
  const { user } = useContext(AuthProvider);
  const schema = Yup.object().shape({
    login: Yup.string().required("Required Field"),
    password: Yup.string().required("Required Field").min(6, t("min-6")),
  });
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation<string>();

  const {
    register,
    handleSubmit,

    setError,
    formState: { isSubmitting, errors },
  } = useForm<LOGIN_FORM>({
    resolver: yupResolver(schema),
  });
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  const { mutateAsync: login } = useMutation(userLogin, {
    onSuccess: (data) => {
      localStorage.setItem("dshtid", data.result.token);
      queryClient.setQueryData("auth", data.result.userInfo);
      history.replace(location.state ?? "/dashboard");
      // if (location.state) {
      //   history.push(location.state);
      //   console.log(location.state);
      // } else {
      //   console.log("hi");
      // }
    },
  });
  const onSubmit = async (data: LOGIN_FORM) => {
    console.log(data);
    try {
      await login({
        password: data.password,
        login: data.login.toLowerCase(),
      });
    } catch (error) {
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
    <Container>
      <ContentWrapper>
        <Header>
          <LogoContainer to="/">
            <img src="/images/logo.svg" alt="logo" />
          </LogoContainer>
        </Header>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <IconedInput
              Icon={MdMail}
              errors={errors?.login}
              name="login"
              register={register}
              label="Email"
            />
            {/* <InputContainer>
              <Label>{t("email")}</Label>
              <Input {...register("login")} />

              <ErrorMessage>{errors.login?.message}</ErrorMessage>
            </InputContainer> */}
            <PasswordInput
              errors={errors?.password}
              name="password"
              register={register}
              label="Password"
            />
            {/* <InputContainer>
              <Label>{t("password")}</Label>
              <PasswordInputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <ShowPassword
                  type="button"
                  onClick={() => handleShowPassword()}
                >
                  {showPassword ? (
                    <MdVisibilityOff size={21} />
                  ) : (
                    <MdVisibility size={21} />
                  )}
                </ShowPassword>
              </PasswordInputContainer>

              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputContainer> */}
            <Button
              width="100%"
              bg="primary"
              padding="0.5rem"
              text="Login"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              withRipple
              withTransition
            />
          </Form>
        </FormContainer>
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
  );
};

export default Login;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) => props.theme.bodyColor};
`;

const ContentWrapper = styled.div`
  /* width:100%; */
  max-width: 90%;
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
const FormContainer = styled.div`
  padding: 0.75rem 0.75rem;
  border: ${(props) => props.theme.btnBorder};
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #fff;
  border-radius: 12px;
  min-width: 300px;
  margin-bottom: 0.5rem;
  background: ${(props) => props.theme.overlayColor};
`;
const Form = styled.form`
  padding: 0rem 0.25rem;
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
  color: ${(props) => props.theme.headingColor};
`;

const InlineLink = styled(Link)`
  color: ${(props) => props.theme.dangerRed};
  font-weight: ${(props) => props.theme.font.regular};
  text-decoration: underline;
`;
