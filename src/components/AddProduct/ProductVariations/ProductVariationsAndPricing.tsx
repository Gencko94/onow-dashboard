import styled from 'styled-components';
import 'react-toggle/style.css';
import Variations from './Variations/Variations';
import { IoPricetagsOutline } from 'react-icons/io5';
import { Controller, useFormContext } from 'react-hook-form';
import { NEW_PRODUCT } from '../../../interfaces/products/products';
const ProductVariationsAndPricing = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<NEW_PRODUCT>();
  const priceFromVariationsEnabled = watch('priceFromVariations');
  const variationsEnabled = watch('productVariationsEnabled');
  const saleEndDateEnabled = watch('saleEndDateEnabled');
  const saleEnabled = watch('saleEnabled');
  return (
    <Container>
      <div className="content">
        <h5 className="title">Product Pricing</h5>
        <InputsContainer>
          <div>
            <label>Product Price </label>
            <div className="input-container">
              <span className="icon">
                <IoPricetagsOutline size={20} />
              </span>
              <input
                {...register?.('price', {
                  required: priceFromVariationsEnabled
                    ? false
                    : 'Required Field',
                })}
                disabled={priceFromVariationsEnabled}
              />
              <p className="currency">KD</p>
            </div>
            <ErrorMessage>{errors?.price?.message}</ErrorMessage>
          </div>
          <div>
            <label>Sale Price</label>
            <div className="input-container">
              <span className="icon">
                <IoPricetagsOutline size={20} />
              </span>

              <input
                {...register?.('salePrice', {
                  required: saleEnabled ? 'Required Field' : false,
                })}
                disabled={!saleEnabled}
              />
              <Controller
                name="saleEnabled"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <EnabledContainer
                    type="button"
                    onClick={() => {
                      if (value === true) {
                        onChange(false);
                        setValue('saleEndDateEnabled', false);
                      } else {
                        if (!priceFromVariationsEnabled) {
                          onChange(true);
                        }
                      }
                    }}
                    enabled={value}
                  >
                    {saleEnabled ? 'Disable' : 'Enable'}
                  </EnabledContainer>
                )}
              />
              <p className="currency">KD</p>
            </div>
            <ErrorMessage>{errors?.salePrice?.message}</ErrorMessage>
          </div>
          <div>
            <label>Sale End Date</label>
            <div className="input-container">
              <span className="icon">
                <IoPricetagsOutline size={20} />
              </span>
              <input
                {...register?.('saleEndDate', {
                  required: saleEndDateEnabled ? 'Required Field' : false,
                })}
                disabled={!saleEndDateEnabled}
              />
              <Controller
                name="saleEndDateEnabled"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <EnabledContainer
                    type="button"
                    onClick={() => {
                      if (value === true) {
                        onChange(false);
                      } else {
                        if (saleEnabled) {
                          onChange(true);
                        }
                      }
                    }}
                    enabled={value}
                  >
                    {value === true ? 'Disable' : 'Enable'}
                  </EnabledContainer>
                )}
              />

              <p className="currency">KD</p>
            </div>
            <ErrorMessage>{errors?.saleEndDate?.message}</ErrorMessage>
          </div>
        </InputsContainer>
        <FlexContainer>
          <div className="text-container">
            <h6>Enable Pricing By Variations</h6>
            <p className="first-subtitle">
              Product Price will be dependent on the Variation Price.
            </p>
            <p className="second-subtitle">
              Enabling this option will enable product variations by default.
            </p>
          </div>
          <div>
            <Controller
              name="priceFromVariations"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Button
                  enabled={value}
                  type="button"
                  onClick={() => {
                    if (value === false) {
                      onChange(true);
                      setValue('productVariationsEnabled', true);
                      if (saleEnabled) {
                        setValue('saleEnabled', false);
                        // unregister('salePrice');
                      }
                      if (saleEndDateEnabled) {
                        setValue('saleEndDateEnabled', false);
                        // unregister('saleEndDate');
                      }
                      // unregister('price');
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
      </div>
      <h5 className="title">Product Variations</h5>
      <FlexContainer>
        <div className="text-container">
          <h6>Enable Variations</h6>
          <p className="first-subtitle">Variations are product options</p>
        </div>
        <div>
          <Controller
            defaultValue={false}
            name="productVariationsEnabled"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Button
                enabled={value}
                type="button"
                onClick={() => {
                  if (!priceFromVariationsEnabled) {
                    if (value === false) {
                      onChange(true);
                    } else {
                      onChange(false);
                    }
                  }
                }}
              >
                {value === true ? 'Disable' : 'Enable'}
              </Button>
            )}
          />
        </div>
      </FlexContainer>

      {variationsEnabled && (
        <Variations priceFromVariationsEnabled={priceFromVariationsEnabled} />
      )}
    </Container>
  );
};

export default ProductVariationsAndPricing;

const Container = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 0.75rem;
  border-radius: 5px;
  min-height: calc(100vh - 100px);
  .title {
    margin-bottom: 0.5rem;
    font-weight: ${props => props.theme.font.bold};
    border-bottom: ${props => props.theme.border};
    padding-bottom: 0.5rem;
  }
  .content {
    margin: 0 0 2rem 0;
  }
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
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
  input {
    flex: 1;
    padding: 0.4rem;
    font-size: 0.8rem;
    width: 50px;
  }
  .icon {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.subHeading};
  }
  .currency {
    padding: 0.4rem;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;
const EnabledContainer = styled.button<{ enabled: boolean }>`
  padding: 0.5rem;
  font-size: 0.7rem;
  background-color: ${props =>
    props.enabled ? props.theme.dangerRed : props.theme.green};

  color: #fff;
  font-weight: ${props => props.theme.font.semibold};
`;
