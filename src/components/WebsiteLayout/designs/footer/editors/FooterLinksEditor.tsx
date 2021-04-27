import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { FOOTER_DESIGN } from '../../../../../interfaces/website-layout/designs/footer-design';

const FooterLinksEditor = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FOOTER_DESIGN>();
  return (
    <Container>
      <h5 className="title">Links Options :</h5>

      {/* <Controller
        name="categoryBar.categories"
        control={control}
        rules={{ required: 'Required' }}
        render={({ field: { ref, onChange } }) => (
          <>
            <Select
              isMulti
              ref={ref}
              options={options}
              onChange={val => onChange(val)}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id.toString()}
            />
            <ErrorMessage>
              {errors?.categoryBar?.categories! && 'Required Field'}
            </ErrorMessage>
          </>
        )}
      /> */}
    </Container>
  );
};

export default FooterLinksEditor;
const Container = styled.div`
  padding: 0.5rem;
  .title {
    font-weight: ${props => props.theme.font.bold};
    color: ${props => props.theme.headingColor};
    margin-bottom: 0.5rem;
  }
`;
