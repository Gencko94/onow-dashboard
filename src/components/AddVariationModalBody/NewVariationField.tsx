import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdSubtitles } from 'react-icons/md';
import { IoPricetagsOutline } from 'react-icons/io5';
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
import { SALE_TYPES } from '../../interfaces/products/products';
interface IProps {
  variationType: any;
  setNewVariationsIndeces: Dispatch<SetStateAction<number[]>>;
  newVariationsIndeces: number[];
  index: number;
}

const NewVariationField = ({
  variationType,
  index,
  setNewVariationsIndeces,
  newVariationsIndeces,
}: IProps) => {
  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [saleType, setSaleType] = useState<SALE_TYPES>('fixed');
  const [saleTypeOptionsOpen, setSaleTypeOptionsOpen] = useState(false);

  return (
    <Container>
      <InputsContainer>
        <div>
          <Label> Value Title English</Label>
          <IconedInputContainer>
            <Icon>
              <MdSubtitles size={20} />
            </Icon>
            <Input />
          </IconedInputContainer>
        </div>
        <div>
          <Label>Value Title Arabic</Label>
          <IconedInputContainer>
            <Icon>
              <MdSubtitles size={20} />
            </Icon>
            <Input />
          </IconedInputContainer>
        </div>
      </InputsContainer>
      <PricingContainer>
        <div>
          <Label>Variation Price </Label>

          <IconedInputContainer>
            <Icon>
              <IoPricetagsOutline size={20} />
            </Icon>
            <Input />
            <Currency>KD</Currency>
          </IconedInputContainer>
        </div>
        <div>
          <Label>Sale Price </Label>
          <IconedInputContainer>
            <Icon>
              <IoPricetagsOutline size={20} />
            </Icon>
            <Input />
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
        </div>
        <div>
          <Label>Sale End Date </Label>
          <IconedInputContainer>
            <Input
              placeholder="Optional.."
              readOnly
              value={format(date as Date, 'yyyy-MM-dd')}
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
      {newVariationsIndeces.length > 1 && (
        <DelIcon
          onClick={() => {
            setNewVariationsIndeces(prev => {
              return prev.filter(i => i !== index);
            });
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
  font-size: 0.9rem;
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
  font-size: 0.8rem;
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
  grid-template-columns: 1fr 1fr;
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
  padding: 0.5rem;
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
  padding: 0.5rem;
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
