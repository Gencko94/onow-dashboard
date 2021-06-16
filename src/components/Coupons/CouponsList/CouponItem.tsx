import styled from "styled-components";
import { BsCheck, BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { COUPON } from "../../../interfaces/coupons/coupons";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { deleteCoupon } from "../../../utils/queries";
import ErrorToast from "../../reusable/ErrorToast";
import Button from "../../reusable/Button";
import Popover from "../../reusable/Popover";
import ConfirmationModal from "../../reusable/ConfirmationModal";
interface IProps {
  coupon: COUPON;
  sortBy: any;
}

const CouponItem = ({ coupon, sortBy }: IProps) => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
  // Delete Mutation

  const {
    mutateAsync,
    reset,
    isError: deleteError,
  } = useMutation(deleteCoupon, {
    onSuccess: () => {
      queryClient.setQueryData<COUPON[] | undefined>(
        ["coupons", sortBy],
        (prev) => {
          return prev?.filter((i) => i.id !== coupon.id);
        }
      );
    },
  });

  const renderStatus = (id: number) => {
    // if Enabled
    if (id === 1) {
      return (
        <Status color="green">
          <span className="dot" />
          <h6>Active</h6>
        </Status>
      );
    } else if (id === 0) {
      return (
        <Status color="#b72b2b">
          <span className="dot" />
          <h6>Disabled</h6>
        </Status>
      );
    }
  };
  const handleDeleteCoupon = async (id: number) => {
    try {
      await mutateAsync(id.toString());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container onClick={() => history.push(`/coupons/coupon/${coupon.id}`)}>
        <div className="field">
          <h6>{coupon.name[language]}</h6>
        </div>
        <div className="field">{renderStatus(2)}</div>
        <div className="field">
          <EnabledButton enabled={false} type="button">
            Enable
          </EnabledButton>
        </div>
        <div className="field">
          <ButtonsContainer>
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
                    bg="white"
                    color="#444"
                    hoverColor="#b72b2b"
                    textSize="0.8rem"
                    Icon={RiDeleteBinLine}
                    iconSize={15}
                    onClick={(e) => {
                      e.stopPropagation();

                      setActionsMenuOpen(false);
                      setModalOpen(true);
                    }}
                  />
                </Popover>
              </CSSTransition>
            </ActionButtonContainer>
          </ButtonsContainer>
        </div>
      </Container>
      <CSSTransition
        in={deleteError}
        classNames="error-toast"
        unmountOnExit
        timeout={200}
      >
        <ErrorToast
          text="Something Went Wrong"
          btnText="Close"
          closeFunction={reset}
        />
      </CSSTransition>
      <ConfirmationModal
        isOpen={modalOpen}
        closeFunction={() => setModalOpen(false)}
        desc="Are you sure you want to delete this coupon ?"
        successButtonText="Delete"
        successFunction={() => handleDeleteCoupon(coupon.id)}
        title="Delete Coupon"
        styles={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />
    </>
  );
};

export default CouponItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: #fff;
  gap: 1rem;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
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

const ButtonsContainer = styled.div`
  button.icon {
    display: block;
    position: relative;
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
const ActionButtonContainer = styled.div`
  position: relative;
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
const EnabledButton = styled.button<{ enabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) =>
    props.enabled ? props.theme.dangerRed : props.theme.green};
  color: ${(props) => props.theme.btnText};
  border: ${(props) => props.theme.border};
  border-radius: 5px;
`;
