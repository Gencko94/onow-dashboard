import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../StyledComponents/Heading";

interface IProps {
  /**
   * The name of the parent component.
   */
  parentLabel: string;
  /**
   * The ```href``` of the parent component.
   */
  parentTarget: string;
  /**
   * The name of the current component.
   */
  childLabel: string;
}

const Breadcrumbs = ({ childLabel, parentLabel, parentTarget }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Heading color="primary" tag="h5" mb="0.5rem">
        {childLabel}
      </Heading>

      <div className="links-container">
        <MainLink to={parentTarget}>{t(parentLabel)}</MainLink>
        <span className="chevron">
          <FiChevronRight size={16} />
        </span>
        <p>{t(childLabel)}</p>
      </div>
    </Container>
  );
};

export default Breadcrumbs;

const Container = styled.aside(
  ({ theme: { breakpoints, shadow } }) => `
  border-radius: 6px;
 
  .links-container {
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
      font-size:1rem;

    }
  }
  `
);
const MainLink = styled(Link)`
  /* font-size: 0.9rem; */
  display: block;
  color: ${(props) => props.theme.mainColor};
`;
