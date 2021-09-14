import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Heading from "../../components/StyledComponents/Heading";
import Paragraph from "../../components/StyledComponents/Paragraph";
import { Accordion } from "@reach/accordion";

import update from "immutability-helper";

import MenuConfigItem from "../../components/WebsiteAppearance/MenuConfigItem";
import { useCallback } from "react";
import Spacer from "../../components/reusable/Spacer";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";
export type MENU_ITEM = {
  id: number;
  name: { [key: string]: string };
  products: { id: number; name: { [key: string]: string } }[];
};
const MenuConfiguration = () => {
  const [indices, setIndices] = useState<number[]>([]);
  const [cards, setCards] = useState<MENU_ITEM[]>([
    {
      id: 1,
      name: { ar: "كاتيغوري 1 ", en: "Category 1" },
      products: [{ id: 1, name: { ar: "منتج 1", en: "Product 1" } }],
    },
    {
      id: 2,
      name: { ar: "كاتيغوري 2 ", en: "Category 2" },
      products: [{ id: 2, name: { ar: "منتج 2 ", en: "Product 2" } }],
    },
  ]);

  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
  const toggleAccordionItem = useCallback(
    (toggledIndex: number) => {
      console.log(toggledIndex, indices);
      if (indices.includes(toggledIndex)) {
        setIndices(
          indices.filter((currentIndex) => currentIndex !== toggledIndex)
        );
      } else {
        console.log("push");
        setIndices((prev) => {
          return [...prev, toggledIndex];
        });
      }
    },
    [cards]
  );
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );
  return (
    <>
      <Heading tag="h5" type="large-title">
        Menu Configuration/ Website Appearance
      </Heading>

      <Paragraph>
        Control your Homepage items and order them as you wish.
      </Paragraph>
      <Spacer size={20} />
      <Flex items="center" justify="flex-end">
        <Button color="primary" withTransition>
          Add New Section
        </Button>
      </Flex>
      <Spacer size={40} />
      <CollapsibleTable
        index={indices}
        onChange={toggleAccordionItem}
        collapsible
        multiple
      >
        {cards.map((item, i) => (
          <MenuConfigItem
            key={item.id}
            item={item}
            index={i}
            moveCard={moveCard}
            isLast={i === cards.length - 1}
          />
        ))}
      </CollapsibleTable>
    </>
  );
};

export default MenuConfiguration;
const CollapsibleTable = styled(Accordion)`
  border-radius: 20px;
  border: ${(props) => props.theme.border};
  /* border-top: none; */
  /* padding: 0.5rem; */
  overflow-x: auto;
  overflow-y: hidden;
  /* border-width: 2px; */

  background-color: ${(props) => props.theme.subtleBackground};

  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
