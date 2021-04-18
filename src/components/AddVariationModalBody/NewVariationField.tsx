import { useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdSubtitles } from 'react-icons/md';
import { IoColorPaletteOutline, IoPricetagsOutline } from 'react-icons/io5';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import ClickAwayListener from 'react-click-away-listener';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlinePercentage } from 'react-icons/ai';
import { NEW_VARIATION, SALE_TYPES } from '../../interfaces/products/products';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';
import { SketchPicker } from 'react-color';

interface IProps {
  variationType: any;
  field: FieldArrayWithId<NEW_VARIATION, 'values', 'id'>;
  index: number;
  length: number;
  remove: (index?: number | number[] | undefined) => void;
  priceFromVariationsEnabled: boolean;
}

const NewVariationField = ({
  variationType,
  index,
  length,
  remove,
  field,
  priceFromVariationsEnabled,
}: IProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<NEW_VARIATION>();

  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [saleType, setSaleType] = useState<SALE_TYPES>('fixed');
  const [saleTypeOptionsOpen, setSaleTypeOptionsOpen] = useState(false);

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const color = watch(`values.${index}.color` as const);

  const priceEnabled = watch(`values.${index}.priceEnabled` as const);
  const saleEnabled = watch(`values.${index}.saleEnabled` as const);
  const saleEndDateEnabled = watch(
    `values.${index}.saleEndDateEnabled` as const
  );

  return (
    <Container>
      <InputsContainer>
        <div>
          <Label> Value Title English</Label>
          <IconedInputContainer>
            <Icon>
              <MdSubtitles size={20} />
            </Icon>
            <Input
              defaultValue={field.name}
              {...register(`values.${index}.name` as const, {
                required: 'Required Field',
                validate: value => value === '1',
              })}
            />
          </IconedInputContainer>
          <ErrorMessage>{errors?.values?.[index]?.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Value Title Arabic</Label>
          <IconedInputContainer>
            <Icon>
              <MdSubtitles size={20} />
            </Icon>
            <Input
              {...register(
                `values.${index}.name_ar` as `values.${number}.name_ar`,
                {
                  required: 'Required Field',
                }
              )}
            />
          </IconedInputContainer>
          <ErrorMessage>
            {errors?.values?.[index]?.name_ar?.message}
          </ErrorMessage>
        </div>
        {variationType?.id === 2 && (
          <div>
            <Label>Color</Label>
            <IconedInputContainer>
              <Icon>
                <IoColorPaletteOutline size={20} />
              </Icon>
              <Input value={color} defaultValue={field.color} readOnly />
              <ColorButton
                onClick={() => setColorPickerOpen(true)}
                type="button"
                color={color || '#555'}
              />
              <Controller
                control={control}
                name={`values.${index}.color` as const}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <ClickAwayListener
                    onClickAway={() => {
                      if (colorPickerOpen) {
                        setColorPickerOpen(false);
                      }
                    }}
                  >
                    <ColorPickerContainer hidden={!colorPickerOpen}>
                      <SketchPicker
                        disableAlpha
                        color={value}
                        onChangeComplete={color => {
                          console.log(color);
                          onChange(color.hex);
                        }}
                      />
                    </ColorPickerContainer>
                  </ClickAwayListener>
                )}
              />
            </IconedInputContainer>
            <ErrorMessage>
              {errors?.values?.[index]?.name_ar?.message}
            </ErrorMessage>
          </div>
        )}
      </InputsContainer>
      <PricingContainer>
        <div>
          <Label>Variation Price </Label>

          <IconedInputContainer>
            <Icon>
              <IoPricetagsOutline size={20} />
            </Icon>
            <Input
              defaultValue={field.price}
              disabled={!priceEnabled}
              {...register(`values.${index}.price` as const, {
                required: priceEnabled ? 'Required Field' : false,
              })}
            />
            <Controller
              name={`values.${index}.priceEnabled` as const}
              control={control}
              defaultValue={field.priceEnabled}
              render={({ field: { onChange, value } }) => (
                <EnabledContainer
                  type="button"
                  onClick={() => {
                    if (value === true) {
                      if (!priceFromVariationsEnabled) {
                        onChange(false);
                      }
                    } else {
                      onChange(true);
                    }
                    if (saleEnabled) {
                      setValue(
                        `values.${index}.saleEnabled` as const,
                        false as never
                      );
                    }
                    if (saleEndDateEnabled) {
                      setValue(
                        `values.${index}.saleEndDateEnabled` as const,
                        false as never
                      );
                    }
                  }}
                  enabled={priceEnabled}
                >
                  {priceEnabled ? 'Disable' : 'Enable'}
                </EnabledContainer>
              )}
            />

            <Currency>KD</Currency>
          </IconedInputContainer>
          <ErrorMessage>{errors?.values?.[index]?.price?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Sale Price </Label>
          <IconedInputContainer>
            <Icon>
              <IoPricetagsOutline size={20} />
            </Icon>
            <Input
              defaultValue={field.sale_price}
              disabled={!saleEnabled}
              {...register(`values.${index}.sale_price` as const, {
                required: saleEnabled ? 'Required Field' : false,
              })}
            />
            <Controller
              name={`values.${index}.saleEnabled` as const}
              control={control}
              defaultValue={field.saleEnabled}
              render={({ field: { onChange, value } }) => (
                <EnabledContainer
                  type="button"
                  onClick={() => {
                    if (value === true) {
                      onChange(false);
                      if (saleEndDateEnabled) {
                        setValue(
                          `values.${index}.saleEndDateEnabled` as const,

                          false as never
                        );
                      }
                    } else {
                      if (priceEnabled) {
                        onChange(true);
                      }
                    }
                  }}
                  enabled={saleEnabled}
                >
                  {saleEnabled ? 'Disable' : 'Enable'}
                </EnabledContainer>
              )}
            />

            {saleType === 'fixed' ? (
              <Currency>KD</Currency>
            ) : (
              <Icon>
                <AiOutlinePercentage size={15} />
              </Icon>
            )}
            <SaleTypeOptionsContainer
              onClick={() => setSaleTypeOptionsOpen(!saleTypeOptionsOpen)}
              type="button"
            >
              <SaleType>{saleType}</SaleType>
              <BiChevronDown size={19} />
              {saleTypeOptionsOpen && (
                <ClickAwayListener
                  onClickAway={() => setSaleTypeOptionsOpen(false)}
                >
                  <OptionsContainer>
                    <Option onClick={() => setSaleType('fixed')}>Fixed</Option>
                    <Option onClick={() => setSaleType('percent')}>
                      Percent
                    </Option>
                  </OptionsContainer>
                </ClickAwayListener>
              )}
            </SaleTypeOptionsContainer>
          </IconedInputContainer>
          <ErrorMessage>
            {errors?.values?.[index]?.sale_price?.message}
          </ErrorMessage>
        </div>
        <div>
          <Label>Sale End Date </Label>
          <IconedInputContainer>
            <Input
              disabled={!saleEndDateEnabled}
              {...register(`values.${index}.sale_end_date` as const, {
                required: saleEndDateEnabled ? 'Required Field' : false,
              })}
              placeholder="Optional.."
              readOnly
              value={format(date as Date, 'yyyy-MM-dd')}
            />
            <Controller
              name={`values.${index}.saleEndDateEnabled` as const}
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
                  enabled={saleEndDateEnabled}
                >
                  {saleEndDateEnabled ? 'Disable' : 'Enable'}
                </EnabledContainer>
              )}
            />

            <Icon onClick={() => setCalendarOpen(true)}>
              <FiCalendar />
            </Icon>
            <CSSTransition
              in={calendarOpen}
              timeout={150}
              classNames="calendar"
              unmountOnExit
            >
              <ClickAwayListener onClickAway={() => setCalendarOpen(false)}>
                <CalendarContainer>
                  <Calendar
                    value={date as Date | Date[]}
                    onChange={(date: Date | Date[]) => {
                      setCalendarOpen(false);
                      setDate(date);
                    }}
                    tileClassName="tile"
                    minDate={new Date()}
                    prev2Label={<FaAngleDoubleLeft size={20} />}
                    next2Label={<FaAngleDoubleRight size={20} />}
                    prevLabel={<FaAngleLeft size={20} />}
                    nextLabel={<FaAngleRight size={20} />}
                    showNeighboringMonth={false}
                  />
                </CalendarContainer>
              </ClickAwayListener>
            </CSSTransition>
          </IconedInputContainer>
        </div>
      </PricingContainer>
      <InputsContainer>
        <div>
          <Label> Barcode</Label>
          <IconedInputContainer>
            <Input />
          </IconedInputContainer>
        </div>
        <div>
          <Label>SKU</Label>
          <IconedInputContainer>
            <Input />
          </IconedInputContainer>
        </div>
      </InputsContainer>
      <hr />
      {length > 1 && (
        <DelIcon
          onClick={() => {
            remove(index);
          }}
        >
          <RiDeleteBinLine size={22} />
        </DelIcon>
      )}
    </Container>
  );
};

export default NewVariationField;
const Container = styled.div`
  padding: 0.5rem;
  padding-bottom: 0;
  border-radius: 5px;
  position: relative;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.regular};
  display: inline-block;
`;
const Input = styled.input`
  flex: 1;
  padding: 0.4rem;
  font-size: 0.8rem;
  width: 50px;
`;

const IconedInputContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.inputColorLight};
  color: ${props => props.theme.headingColor};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
const CalendarContainer = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  bottom: 0px;
  direction: ltr;
  width: 250px;
  height: 250px;
`;

const Currency = styled.p`
  padding: 0.4rem;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
  margin: 0.5rem 0;
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;
const DelIcon = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  z-index: 1;
  color: ${props => props.theme.dangerRed};
`;
const Icon = styled.span`
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.subHeading};
`;
const SaleTypeOptionsContainer = styled.button`
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: ${props => props.theme.border};
  border-left: ${props => props.theme.border};
  position: relative;
  cursor: pointer;
`;
const OptionsContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 110%;
  left: 0;
  right: 0;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  overflow: hidden;
`;
const Option = styled.div`
  padding: 0.4rem;
  font-size: 0.8rem;
  background-color: #fff;
  color: ${props => props.theme.subHeading};
  transition: all 75ms ease;
  &:hover {
    color: ${props => props.theme.headingColor};
    font-weight: ${props => props.theme.font.semibold};
  }
`;
const SaleType = styled.p`
  font-size: 0.8rem;
`;
const EnabledContainer = styled.button<{ enabled: boolean }>`
  padding: 0.5rem;
  font-size: 0.7rem;
  background-color: ${props =>
    props.enabled ? props.theme.dangerRed : props.theme.green};

  color: #fff;
  font-weight: ${props => props.theme.font.semibold};
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;
const ColorPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 35px;
  bottom: -150px;
  /* display: none; */
`;
const ColorButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  /* padding: 0.4rem; */
  margin: 0 0.25rem;
`;
