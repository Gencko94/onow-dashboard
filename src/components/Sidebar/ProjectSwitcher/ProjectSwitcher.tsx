import styled from "styled-components";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUserStores } from "../../../utils/queries";
import { useTranslation } from "react-i18next";
import ProjectItem from "./ProjectItem";
const ProjectSwitcher = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useQuery("stores", getUserStores);
  const {
    i18n: { language },
  } = useTranslation();

  if (data?.length === 0) return null;
  return (
    <Container>
      <Project>
        <img
          className="logo"
          src="/images/storeLogo.png"
          alt={data?.[0].name[language]}
        />
        <div className="name-container">
          <p className="name">{data?.[0].name[language]}</p>
          <p className="domain">{data?.[0].domain}</p>
        </div>
      </Project>
      <button onClick={() => setMenuOpen(true)} className="switcher">
        <HiOutlineSwitchVertical size={22} />
        <CSSTransition
          in={menuOpen}
          classNames="menu"
          unmountOnExit
          timeout={100}
        >
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <ul className="menu">
              {data?.map((project) => {
                return <ProjectItem key={project.id} project={project} />;
              })}
            </ul>
          </ClickAwayListener>
        </CSSTransition>
      </button>
    </Container>
  );
};

export default ProjectSwitcher;
const Container = styled.div`
  background: linear-gradient(90deg, #fe0488, #f78f21);
  color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.5rem;

  display: grid;
  position: relative;
  grid-template-columns: 1fr 25px;

  border-radius: 8px;
  margin-bottom: 1rem;
  .switcher {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    .menu {
      position: absolute;
      top: -10px;
      right: 8px;
      z-index: 10;
      width: 100%;
      background-color: #fff;
      transform-origin: right;
      box-shadow: ${(props) => props.theme.shadow};
      border-radius: 5px;
      max-height: 300px;
      min-height: 100px;
      overflow-y: auto;
      color: ${(props) => props.theme.headingColor};
    }
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  .logo {
    border-radius: 50%;
    max-height: 40px;
  }
  .name-container {
    align-items: center;
    margin: 0 0.5rem;
    p.name {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.regular};
    }
    p.domain {
      font-size: 0.7rem;
      font-weight: ${(props) => props.theme.font.regular};
    }
  }
`;
