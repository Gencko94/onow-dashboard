import React from "react";
import { useTranslation } from "react-i18next";
import { BiHomeAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import Heading from "../StyledComponents/Heading";

interface IProps {
  children: { target: string; name: { [key: string]: string } }[];
}

const Breadcrumbs = ({ children }: IProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { isDesktop } = useResponsive();
  return (
    <Container>
      <Heading tag="h5" color="primary" mb="0.5rem" weight="semibold">
        {children[children.length - 1].name[language]}
      </Heading>
      <div className="links-container">
        <HomeLink to="/">
          <BiHomeAlt size={16} />
          {t("Home")}
        </HomeLink>
        <span className="chevron">
          <FiChevronRight size={16} />
        </span>
        {children.map((child, i) => {
          return (
            <React.Fragment key={i}>
              {i === children.length - 1 ? (
                <p>{child.name[language]}</p>
              ) : (
                <StyledLink to={child.target}>
                  {child.name[language]}
                </StyledLink>
              )}
              {i !== children.length - 1 && (
                <span className="chevron">
                  <FiChevronRight size={16} />
                </span>
              )}
            </React.Fragment>
          );
        })}
        {/* {!isDesktop &&
          children.splice(children.length - 2).map((child, i) => {
            return (
              <React.Fragment key={i}>
                {i === children.length - 1 ? (
                  <p>{child.name[language]}</p>
                ) : (
                  <StyledLink to={child.target}>
                    {child.name[language]}
                  </StyledLink>
                )}
                {i !== children.length - 1 && (
                  <span className="chevron">
                    <FiChevronRight size={16} />
                  </span>
                )}
              </React.Fragment>
            );
          })} */}
      </div>
    </Container>
  );
};

export default Breadcrumbs;

const Container = styled.nav(
  ({ theme: { breakpoints, font, headingColor, border } }) => `
  
  
  .links-container {
      p {
          color:${headingColor};
          font-weight:${font.semibold};
      };
    font-size: 0.9rem;
    white-space:nowrap;
    display: flex;
    font-size:0.9rem;
    align-items: center;
    .chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.75rem;
    }
  };
  @media ${breakpoints.md} {
    .links-container {
      font-size:0.9rem;
      
    }
  }
  `
);
const StyledLink = styled(Link)`
  display: block;
  color: ${(props) => props.theme.textSecondary};
  transition: color 75ms ease;
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;
const HomeLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
