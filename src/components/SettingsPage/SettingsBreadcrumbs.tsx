import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  transId: string;
}

const SettingsBreadcrumbs = ({ transId }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <h5>{transId}</h5>
      <div className="links-container">
        <MainLink to="/settings">Settings</MainLink>
        <span className="chevron">
          <FiChevronRight size={16} />
        </span>
        <p>{t(transId)}</p>
      </div>
    </Container>
  );
};

export default SettingsBreadcrumbs;
const Container = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  h5 {
    margin-bottom: 0.5rem;
  }
  .links-container {
    display: flex;
    .chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.75rem;
    }
  }
`;
const MainLink = styled(Link)`
  /* font-size: 0.9rem; */
  color: ${(props) => props.theme.mainColor};
`;