import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { COUPON } from "../../../interfaces/coupons/coupons";
import { useTranslation } from "react-i18next";

import Button from "../../reusable/Button";

import useConfirmationModal from "../../../hooks/useConfirmationModal";
import Checkbox from "../../reusable/Inputs/Checkbox";
import Flex from "../../StyledComponents/Flex";

import Paragraph from "../../StyledComponents/Paragraph";
import IconButton from "../../reusable/IconButton";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";

interface IProps {
  coupon: COUPON;
  handleDeleteCoupon: (id: number) => void;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
}

const CouponItem = ({
  coupon,
  handleDeleteCoupon,
  handleToggleRows,
  selectedRows,
}: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const history = useHistory();

  const {
    i18n: { language },
  } = useTranslation();

  const renderStatus = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <Status color="green">
            <span className="dot" />
            <h6>Active</h6>
          </Status>
        );
      case false:
        return (
          <Status color="#b72b2b">
            <span className="dot" />
            <h6>Disabled</h6>
          </Status>
        );
      default:
        break;
    }
  };

  return (
    <Container selected={selectedRows.includes(coupon.id)}>
      <div className="field">
        <Checkbox
          checked={selectedRows.includes(coupon.id)}
          onChange={(e) => {
            handleToggleRows(coupon.id);
            e.stopPropagation();
          }}
        />
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {coupon.name[language]}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {coupon.code}
        </Paragraph>
      </div>
      <div className="field">{renderStatus(coupon.enabled)}</div>
      <div className="field">
        <Flex>
          <Menu>
            <MenuButton>
              <IconButton>
                <BsThreeDotsVertical size={20} />
              </IconButton>
            </MenuButton>
            <MenuPopover
              className="slide-down"
              position={(button, popover) => {
                return {
                  top: button!.bottom,
                  left: button!.left - button!.width,
                };
              }}
            >
              <MenuItem
                onSelect={() => {
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this coupon ?",
                    title: "Delete Coupon",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteCoupon(coupon.id),
                  });
                }}
              >
                Delete coupon
              </MenuItem>
            </MenuPopover>
          </Menu>

          <Button
            size="sm"
            color="primary"
            margin="0 0.5rem"
            withTransition
            onClick={() => {
              history.push(`/coupons/coupon/${coupon.id}`);
            }}
          >
            Edit
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default CouponItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(35px, 50px)) repeat(
      4,
      minmax(140px, 1fr)
    );
  background-color: ${(props) => props.theme.subtleBackground};

  &:hover {
  }

  .field {
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
    position: relative;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .dot {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
  }
  h6 {
    /* font-size: 0.8rem; */
    color: ${(props) => props.color};

    margin: 0 0.25rem;
  }
`;
