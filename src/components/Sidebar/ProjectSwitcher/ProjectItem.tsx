import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp, BiLinkExternal } from "react-icons/bi";
import { HiSwitchHorizontal } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { STORE } from "../../../interfaces/auth/auth";

interface IProps {
  project: STORE;
}

const ProjectItem = ({ project }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Container onClick={() => setMenuOpen(!menuOpen)}>
        <div className="project">
          <img
            className="logo"
            src="/images/storeLogo.png"
            alt={project.storeName[language]}
          />
          <div className="name-container">
            <p className="name">{project.storeName[language]}</p>
            <p className="domain">{project.domain}</p>
          </div>
        </div>
        <button className="menu-toggler">
          {menuOpen ? <BiChevronUp size={25} /> : <BiChevronDown size={25} />}
        </button>
      </Container>
      <CSSTransition
        in={menuOpen}
        classNames="project-menu"
        timeout={250}
        unmountOnExit
      >
        <SubMenu>
          <div className="content">
            <div className="switch">
              <p>Switch to Project</p>
              <HiSwitchHorizontal />
            </div>
            <a className="link" href={`http://${project.domain}`} target="#">
              <p>Visit Website</p>
              <BiLinkExternal />
            </a>
          </div>
        </SubMenu>
      </CSSTransition>
    </>
  );
};

export default ProjectItem;
const Container = styled.button`
  padding: 0.5rem;
  display: grid;
  width: 100%;
  align-items: center;
  grid-template-columns: 1fr 25px;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }
  .project {
    display: flex;
    align-items: center;
  }
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
  .menu-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem;
    box-shadow: ${(props) => props.theme.shadow};
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;
const SubMenu = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  .content {
    padding: 1rem 0.5rem;
    .link {
      display: flex;

      align-items: center;
      color: ${(props) => props.theme.mainColor};
      &:hover {
        text-decoration: underline;
      }
      p {
        font-size: 0.9rem;
        margin: 0 0.25rem;
      }
    }
    .switch {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      &:hover {
        text-decoration: underline;
      }
      p {
        font-size: 0.9rem;
        margin: 0 0.25rem;
      }
    }
  }
`;
