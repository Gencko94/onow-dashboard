import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import StoreTaskCard from "./StoreTaskCard";
import TasksProgressBar from "./TasksProgressBar";

const StoreTasks = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <div className="head-container">
        <button onClick={() => setOpen(!open)} className="toggle-btn">
          <span className="icon">
            {open ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </span>
          <h5>Complete Store tasks to get your store ready</h5>
        </button>
        <TasksProgressBar completed={56} />
      </div>
      <CSSTransition
        in={open}
        classNames="store-tasks"
        timeout={250}
        unmountOnExit
      >
        <div>
          <div className="cards-container">
            <StoreTaskCard
              image="/images/products.svg"
              title="Store Identity"
              btnText="Go to settings"
              target="/settings/store-identity"
              desc="Configure your Store Identity"
            />
            <StoreTaskCard
              image="/images/settings.svg"
              title="Store Identity"
              btnText="Add Products"
              target="/settings/store-identity"
              desc="Configure your Store Identity"
            />
            <StoreTaskCard
              image="/images/products.svg"
              title="Store Identity"
              btnText="Delivery Options"
              target="/settings/store-identity"
              desc="Configure your Store Identity"
            />
            <StoreTaskCard
              image="/images/settings.svg"
              title="Store Identity"
              btnText="Payment Methods"
              target="/settings/store-identity"
              desc="Configure your Store Identity"
            />
            <StoreTaskCard
              image="/images/products.svg"
              title="Warehouses"
              btnText="Warehouses"
              target="/settings/store-identity"
              desc="Configure your warehouse locations"
            />
          </div>
        </div>
      </CSSTransition>
    </Container>
  );
};

export default StoreTasks;
const Container = styled.div`
  background-color: #fff;
  border-radius: 6px;
  .head-container {
    box-shadow: ${(props) => props.theme.shadow};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    .toggle-btn {
      display: flex;
      align-items: center;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      h5 {
        margin: 0 0.5rem;
      }
    }
  }
  .cards-container {
    padding: 2rem;
    display: grid;
    /* margin: 1rem 0; */
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 2rem;
  }
`;
