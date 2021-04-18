import { Controller, useFormContext } from 'react-hook-form';
import { RiHandCoinFill } from 'react-icons/ri';
import styled from 'styled-components';
import { NEW_PRODUCT } from '../../../interfaces/products/products';

const OrderingOptions = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT>();
  return (
    <Container>
      <h5 className="title">Product Ordering Options</h5>
      <InputsContainer>
        <div>
          <label>Max Quantity per user</label>
          <div className="input-container">
            <span className="icon">
              <RiHandCoinFill size={20} />
            </span>
            <input
              type="number"
              {...register('maxQtyPerUser', {
                required: 'Required Field',
              })}
            />
          </div>
          <ErrorMessage>{errors?.maxQtyPerUser?.message}</ErrorMessage>
        </div>
      </InputsContainer>
      <FlexContainer>
        <div className="text-container">
          <h6>Allow Users to write notes</h6>
          <p className="first-subtitle">
            Enabling this option will allow users to write notes along with the
            product
          </p>
        </div>
        <div>
          <Controller
            name="allowSideNotes"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Button
                enabled={value}
                type="button"
                onClick={() => {
                  if (value === false) {
                    onChange(true);
                  } else {
                    onChange(false);
                  }
                }}
              >
                {value === true ? 'Disable' : 'Enable'}
              </Button>
            )}
          />
        </div>
      </FlexContainer>
    </Container>
  );
};

export default OrderingOptions;
const Container = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 0.75rem;
  border-radius: 5px;
  align-self: flex-start;
  .title {
    margin-bottom: 0.5rem;
    font-weight: ${props => props.theme.font.bold};
    border-bottom: ${props => props.theme.border};
    padding-bottom: 0.5rem;
  }
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    font-weight: ${props => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.inputColorLight};
    color: ${props => props.theme.headingColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .icon {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.subHeading};
  }
  input {
    flex: 1;
    padding: 0.4rem;
    font-size: 0.8rem;
    width: 50px;
  }
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
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
const Button = styled.button<{ enabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props =>
    props.enabled ? props.theme.dangerRed : props.theme.green};
  color: ${props => props.theme.btnText};
  border: ${props => props.theme.border};
  border-radius: 5px;
`;
