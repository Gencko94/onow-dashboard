import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { ChromePicker } from 'react-color';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { FOOTER_DESIGN } from '../../../../../interfaces/website-layout/designs/footer-design';

const FooterContainerEditor = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FOOTER_DESIGN>();
  const [bgPickerOpen, setBgPickerOpen] = useState(false);
  const [textPickerOpen, setTextPickerOpen] = useState(false);
  const bgColor = watch('styles.backgroundColor');
  const textColor = watch('styles.textColor');
  return (
    <Container>
      <h5 className="title">Footer Styles :</h5>
      <div className="wrapper">
        <div className="flex">
          <p>Category Bar Color :</p>
          <ColorButton
            onClick={() => setBgPickerOpen(true)}
            type="button"
            color={bgColor}
          />
          <Controller
            control={control}
            name="styles.backgroundColor"
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
            color={textColor}
          />
          <Controller
            control={control}
            name="styles.textColor"
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
    </Container>
  );
};

export default FooterContainerEditor;
const Container = styled.div`
  padding: 0.5rem;
  .title {
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
    border-radius: 8px;
    background-color: ${props => props.theme.overlayColor};
    border: ${props => props.theme.border};
    /* flex-direction: column; */
  }
  .flex {
    padding: 0.5rem 0.25rem;
    /* margin-bottom: 0.5rem; */
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
