import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { ChromePicker } from 'react-color';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';
import { HEADER_DESIGN } from '../../../../../interfaces/website-layout/designs/header-design';

const options = [
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Food' },
];
const CategoryBarEditor = () => {
  const [bgPickerOpen, setBgPickerOpen] = useState(false);
  const [textPickerOpen, setTextPickerOpen] = useState(false);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<HEADER_DESIGN>();
  const categoryBarBgColor = watch('categoryBar.styles.backgroundColor');
  const categoryBarTextColor = watch('categoryBar.styles.textColor');
  const categories = watch('categoryBar.categories');
  return (
    <Container>
      <div className="styles-wrapper">
        <h6>Category Bar Styles :</h6>
        <div className="wrapper">
          <div className="flex">
            <p>Category Bar Color :</p>
            <ColorButton
              onClick={() => setBgPickerOpen(true)}
              type="button"
              color={categoryBarBgColor}
            />
            <Controller
              control={control}
              name="categoryBar.styles.backgroundColor"
              render={({ field: { onChange, onBlur, value } }) => (
                <ClickAwayListener
                  onClickAway={() => {
                    if (bgPickerOpen) {
                      setBgPickerOpen(false);
                    }
                  }}
                >
                  <ColorPickerContainer hidden={!bgPickerOpen}>
                    <ChromePicker
                      disableAlpha
                      color={value}
                      onChange={color => {
                        console.log(color);
                        onChange(color.hex);
                      }}
                    />
                  </ColorPickerContainer>
                </ClickAwayListener>
              )}
            />
          </div>
          <div className="flex">
            <p>Category Bar Text Color :</p>
            <ColorButton
              onClick={() => setTextPickerOpen(true)}
              type="button"
              color={categoryBarTextColor}
            />
            <Controller
              control={control}
              name="categoryBar.styles.textColor"
              render={({ field: { onChange, onBlur, value } }) => (
                <ClickAwayListener
                  onClickAway={() => {
                    if (textPickerOpen) {
                      setTextPickerOpen(false);
                    }
                  }}
                >
                  <ColorPickerContainer hidden={!textPickerOpen}>
                    <ChromePicker
                      disableAlpha
                      color={value}
                      onChange={color => {
                        console.log(color);
                        onChange(color.hex);
                      }}
                    />
                  </ColorPickerContainer>
                </ClickAwayListener>
              )}
            />
          </div>
        </div>
      </div>
      <h6>Select Categories to be shown:</h6>
      <Controller
        name="categoryBar.categories"
        control={control}
        rules={{ required: 'Required' }}
        render={({ field: { ref, onChange } }) => (
          <>
            <Select
              isMulti
              ref={ref}
              defaultValue={categories}
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
      />
    </Container>
  );
};

export default CategoryBarEditor;
const Container = styled.div`
  border-radius: 8px;
  background-color: ${props => props.theme.overlayColor};
  padding: 0.5rem;
  border: ${props => props.theme.border};
  h6 {
    font-size: 0.9rem;
    font-weight: ${props => props.theme.font.bold};
    color: ${props => props.theme.headingColor};
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.9rem;
  }
  .styles-wrapper {
    margin-bottom: 1rem;
  }
  .wrapper {
    display: flex;
    align-items: center;
    /* box-shadow: ${props => props.theme.shadow}; */
    justify-content: space-between;
    /* padding: 0.25rem; */
  }
  .flex {
    display: flex;
    align-items: center;
    position: relative;
  }
`;
const ColorPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 35px;
  bottom: -150px;
`;
const ColorButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadow};
  border: ${props => props.theme.border};

  margin: 0 0.25rem;
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;
