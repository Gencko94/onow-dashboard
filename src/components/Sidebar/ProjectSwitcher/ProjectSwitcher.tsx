import styled from "styled-components";

import { useContext } from "react";

import { useTranslation } from "react-i18next";

import { AuthProvider } from "../../../contexts/AuthContext";
import { BiLinkExternal } from "react-icons/bi";
const ProjectSwitcher = () => {
  const { user } = useContext(AuthProvider);
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <Project>
        <img
          className="logo"
          src={user?.store.logo}
          alt={user?.store.name[language]}
        />
        <div className="name-container">
          <p className="name">{user?.store.name[language]}</p>

          <a className="link" href={`http://${user?.store.domain}`} target="#">
            <p>{user?.store.domain}</p>
            <BiLinkExternal size={10} />
          </a>
        </div>
      </Project>
    </Container>
  );
};

export default ProjectSwitcher;
const Container = styled.div`
  /* background: linear-gradient(90deg, #fe0488, #f78f21); */
  color: #fff;
  /* box-shadow: ${(props) => props.theme.shadow}; */
  padding: 0.5rem;

  position: relative;

  border-radius: 8px;
  margin-bottom: 1rem;
  .link {
    display: flex;

    align-items: center;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
    p {
      font-size: 0.7rem;
      font-weight: ${(props) => props.theme.font.regular};
      margin: 0 0.25rem;
    }
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  .logo {
    border-radius: 50%;
    max-height: 40px;
  }
  .name-container {
    align-items: center;
    margin: 0 0.5rem;
    p {
      font-size: 0.8rem;
    }
    p.name {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.regular};
    }
  }
`;
