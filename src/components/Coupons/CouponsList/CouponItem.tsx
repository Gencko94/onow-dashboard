import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { COUPON } from "../../../interfaces/coupons/coupons";
import { useTranslation } from "react-i18next";

import Button from "../../reusable/Button";
import Popover from "../../reusable/Popover";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { FlexWrapper } from "../../StyledComponents/Flex";

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
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
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
        <h6>{coupon.name[language]}</h6>
      </div>
      <div className="field">{coupon.code}</div>
      <div className="field">{renderStatus(coupon.enabled)}</div>
      <div className="field">
        <ActionButtonContainer
          onClick={(e) => {
            e.stopPropagation();

            setActionsMenuOpen(true);
          }}
        >
          <button className="icon">
            <BsThreeDotsVertical size={18} />
          </button>
          <CSSTransition
            in={actionsMenuOpen}
            classNames="menu"
            unmountOnExit
            timeout={100}
          >
            <Popover closeFunction={() => setActionsMenuOpen(false)}>
              <Button
                text="Delete Coupon"
                padding="0.5rem"
                bg="transparent"
                textSize="0.8rem"
                Icon={RiDeleteBinLine}
                iconSize={15}
                onClick={(e) => {
                  e.stopPropagation();
                  setActionsMenuOpen(false);
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this coupon ?",
                    title: "Delete Coupon",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteCoupon(coupon.id),
                  });
                }}
              />
            </Popover>
          </CSSTransition>
          <Button
            bg="primary"
            padding="0.5rem"
            text="Edit"
            textSize="0.7rem"
            margin="0 0.5rem"
            withRipple
            withTransition
            onClick={() => {
              history.push(`/coupons/coupon/${coupon.id}`);
            }}
          />
        </ActionButtonContainer>
      </div>
    </Container>
  );
};

export default CouponItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(35px, 50px)) repeat(
      4,
      minmax(100px, 1fr)
    );
  background-color: ${(props) =>
    props.selected ? props.theme.accentColor : "#fff"};
  gap: 1rem;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
    position: relative;
    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
`;

const ActionButtonContainer = styled(FlexWrapper)`
  position: relative;
  button.icon {
    display: inline-block;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: all 75ms ease;
    &:hover {
      background-color: #e6e6e6;
    }
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
