import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import React from "react";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useTranslation } from "react-i18next";
import { AiOutlineDrag } from "react-icons/ai";
import styled from "styled-components";
import { MENU_ITEM } from "../../pages/WebsiteAppearance/MenuConfiguration";
import Button from "../reusable/Button";
import IconButton from "../reusable/IconButton";
import Flex from "../StyledComponents/Flex";
import Heading from "../StyledComponents/Heading";

interface IProps {
  item: MENU_ITEM;
  index: number;
  isLast: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
interface ITEM {
  id: number;
  index: number;
}
interface DROP_COLLECTED_PROPS {
  handlerId: number;
}
const MenuConfigItem = ({ item, index, moveCard, isLast }: IProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    i18n: { language },
  } = useTranslation();
  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: "card",
    item: {
      id: 1,
      index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{}, dropRef] = useDrop<ITEM, null, DROP_COLLECTED_PROPS>({
    accept: "card",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index; // (DRAGGED INDEX/ITEM)
      const hoverIndex = index; // (DROP INDEX/ITEM)

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      console.log(hoverBoundingRect);

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  dropRef(dragRef(ref));
  return (
    <AccordionHead
      isLast={isLast}
      ref={dragPreview}
      style={{ opacity: isDragging ? 1 : 1 }}
    >
      <Flex items="center" justify="space-between">
        <Flex>
          <IconButton ref={ref}>
            <AiOutlineDrag size={30} />
          </IconButton>
          <AccordionButton>
            <Heading tag="h5" type="small-title">
              {item.name[language]}
            </Heading>
          </AccordionButton>
        </Flex>
        <Button appearance="toggle" size="sm" color="blue">
          Expand
        </Button>
      </Flex>
      <AccordionPanel>
        {item.products.map((product) => (
          <ItemContainer key={product.id}>
            {product.name[language]}
          </ItemContainer>
        ))}
      </AccordionPanel>
    </AccordionHead>
  );
};

export default MenuConfigItem;
const AccordionHead = styled(AccordionItem)<{ isLast: boolean }>`
  border-bottom: ${(props) => !props.isLast && props.theme.border};
  background-color: ${(props) => props.theme.subtleBackground};
  padding: 0.75rem;
`;
const ItemContainer = styled.div`
  display: grid;
  padding: 1rem;

  grid-template-columns: repeat(2, minmax(35px, 50px)) repeat(
      7,
      minmax(140px, 1fr)
    );
  background-color: ${(props) => props.theme.subtleFloating};

  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
  }
  .img {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    font-size: 0.6rem;
    object-fit: cover;
  }
  .field {
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
  }
`;
