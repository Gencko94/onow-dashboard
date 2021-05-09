import { useQuery } from 'react-query';
import styled from 'styled-components';
import { HEADER_DESIGN } from '../interfaces/website-layout/designs/header-design';
import { getHeaderDesign } from '../utils/test-queries';

import { useParams } from 'react-router';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import HeaderDemo from '../components/WebsiteLayout/designs/header/HeaderDemo';
import CategoryBarEditor from '../components/WebsiteLayout/designs/header/editors/CategoryBarEditor';

const HeaderCustomizer = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<HEADER_DESIGN>(
    ['header-design', id],
    () => getHeaderDesign(id),
    { suspense: true }
  );
  const methods = useForm<HEADER_DESIGN>({
    defaultValues: data,
    shouldUnregister: false,
  });
  const enableCategoryBar = methods.watch('categoryBar.enabled');
  const onSubmit: SubmitHandler<HEADER_DESIGN> = data => {
    // Submit Style Changes to server
    console.log(data);
  };
  console.log(methods.watch());
  return (
    <FormProvider {...methods}>
      <Container>
        <div className="title-container">
          <h4>Header Customizer</h4>
          <button onClick={methods.handleSubmit(onSubmit)}>Save Changes</button>
        </div>
        <div className="demo-wrapper">
          <HeaderDemo data={data!} />
        </div>
        <FlexContainer>
          <div className="text-container">
            <h6>Enable Category Bar</h6>
            <p className="first-subtitle">
              Category Bar is a useful way for quick access your categories
            </p>
          </div>
          <div>
            <Controller
              name="categoryBar.enabled"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <Toggle checked={value} onChange={onChange} />
              )}
            />
          </div>
        </FlexContainer>
        <hr />
        {enableCategoryBar && <CategoryBarEditor />}
      </Container>
    </FormProvider>
    // </Suspense>
  );
};

export default HeaderCustomizer;
const Container = styled.div`
  padding: 0.75rem;
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: ${props => props.theme.border}; */
    padding: 0.5rem 0;
    button {
      border-radius: 6px;
      color: ${props => props.theme.btnText};
      background-color: ${props => props.theme.green};
      padding: 0.5rem;
    }
  }
  .demo-wrapper {
    /* padding: 1rem; */
    border: ${props => props.theme.border};
    margin: 1rem 0;
    height: 135px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  .text-container {
    flex: auto;
    h6 {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
    .first-subtitle {
      color: ${props => props.theme.headingColor};
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }
    .second-subtitle {
      color: ${props => props.theme.subHeading};
      font-size: 0.75rem;
      font-weight: ${props => props.theme.font.light};
    }
  }
`;
