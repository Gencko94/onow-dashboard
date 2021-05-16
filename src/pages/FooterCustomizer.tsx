import styled from "styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useParams } from "react-router";
import { FOOTER_DESIGN } from "../interfaces/website-layout/designs/footer-design";
import { getFooterDesign } from "../utils/test-queries";
import { useQuery } from "react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { lazy } from "react";
const FooterContainerEditor = lazy(
  () =>
    import(
      "../components/WebsiteLayout/designs/footer/editors/FooterContainerEditor"
    )
);
const FooterDemo = lazy(
  () => import("../components/WebsiteLayout/designs/footer/FooterDemo")
);
const FooterCustomizer = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<FOOTER_DESIGN>(
    ["footer-design", id],
    () => getFooterDesign(id),
    { suspense: true }
  );
  const methods = useForm<FOOTER_DESIGN>({
    defaultValues: data,
    shouldUnregister: false,
  });
  const onSubmit: SubmitHandler<FOOTER_DESIGN> = (data) => {
    // Submit Style Changes to server
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <Container>
        <div className="title-container">
          <h4>Footer Customizer</h4>
          <button onClick={methods.handleSubmit(onSubmit)}>Save Changes</button>
        </div>
        <div className="demo-wrapper">
          <FooterDemo data={data!} />
        </div>
        <FooterContainerEditor />
      </Container>
    </FormProvider>
  );
};

export default FooterCustomizer;
const Container = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: ${(props) => props.theme.border}; */
    padding: 0.5rem 0;
    button {
      border-radius: 6px;
      color: ${(props) => props.theme.btnText};
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
    }
  }
  .demo-wrapper {
    /* padding: 1rem; */
    border: ${(props) => props.theme.border};
    margin: 1rem 0;
    /* height: 135px; */
  }
`;
