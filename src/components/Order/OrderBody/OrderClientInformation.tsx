import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlinePhone, AiOutlineWhatsApp } from 'react-icons/ai';
import { HiOutlineMail, HiOutlineArchive } from 'react-icons/hi';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const OrderClientInformation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Client Information</h6>
        <ActionButtonContainer onClick={() => setMenuOpen(true)}>
          <button className="icon">
            <BsThreeDotsVertical size={20} />
          </button>
          <CSSTransition
            in={menuOpen}
            classNames="menu"
            unmountOnExit
            timeout={100}
          >
            <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
              <ul>
                <li>
                  <button>
                    <span className="icon">
                      <HiOutlineArchive color="brown" size={20} />
                    </span>
                    <p>Orders Archive</p>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="icon">
                      <AiOutlinePhone color="purple" size={20} />
                    </span>
                    <p>Call</p>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="icon">
                      <AiOutlineWhatsApp color="green" size={20} />
                    </span>
                    <p>Whatsapp</p>
                  </button>
                </li>
                <li>
                  <button>
                    <span className="icon">
                      <HiOutlineMail color="blue" size={20} />
                    </span>
                    <p>Send Email</p>
                  </button>
                </li>
              </ul>
            </ClickAwayListener>
          </CSSTransition>
        </ActionButtonContainer>
      </div>
      <div className="content">
        <div className="grid">
          <p className="label">Name :</p>
          <p className="value">Ahmad Zaaza</p>
        </div>
        <div className="grid">
          <p className="label">Phone Number : </p>
          <p className="value">+96598744132</p>
        </div>
        <div className="grid">
          <p className="label">Email :</p>
          <p className="value">gfox.piano@hotmail.com</p>
        </div>
      </div>
    </Container>
  );
};

export default OrderClientInformation;
const Container = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;

  .title-container {
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.overlayColor};
    border-bottom: ${props => props.theme.border};
  }
  .title {
    font-weight: ${props => props.theme.font.xbold};
  }
  .grid {
    padding: 0.5rem 0.5rem;
    display: grid;
    gap: 5px;
    grid-template-columns: auto 1fr;

    p.label {
      color: ${props => props.theme.subHeading};
      font-size: 0.9rem;
    }
    p.value {
      font-size: 0.9rem;
      font-weight: ${props => props.theme.font.semibold};
    }
  }
`;
const ActionButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    position: absolute;
    bottom: -3px;
    right: 8px;
    z-index: 10;
    background-color: #fff;
    transform-origin: right;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadow};
    border-radius: 5px;
  }
  ul li button {
    padding: 0.25rem;
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: ${props => props.color};
    transition: all 75ms ease;
    white-space: nowrap;
    &:hover {
      color: ${props => props.theme.headingColor};
      background-color: ${props => props.theme.highlightColor};
    }
    p {
      margin: 0 0.25rem;
    }
  }
  span.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }
  button.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    padding: 0.25rem;
    &:hover {
      background-color: ${props => props.theme.accentColor};
    }
  }
`;
