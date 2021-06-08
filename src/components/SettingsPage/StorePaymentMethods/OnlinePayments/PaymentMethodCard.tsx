import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components";
import { PAYMENT_GATEWAY } from "../../../../interfaces/settings/payment-methods/payment-methods";
import Button from "../../../reusable/Button";

interface IProps {
  gateway: PAYMENT_GATEWAY;
}

const PaymentMethodCard = ({ gateway }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const history = useHistory();
  return (
    <Container>
      <div className="gateway-identity">
        <img src={gateway.logo} alt={gateway.name.en} />
        <div className="buttons">
          <Button
            text="Create Bookeey Account"
            bg="green"
            padding="0.5rem 0.5rem"
            withTransition
            onClick={() =>
              history.push(
                "/settings/payment-methods/create-payment-gateway-account"
              )
            }
          />
          <Button
            text="Link Existing Bookeey Account"
            bg="primary"
            padding="0.5rem 0.5rem"
          />
        </div>
      </div>
      <div className="info">
        <div className="about">
          <h6>About {gateway.name[language]} </h6>
          <section>
            Xenon4pay is a local Kuwaity based company founded in September 2015
            operates in the ME and North Africa it offers a complete &
            comprehensive solution and believes in the Fast, Trendy & Innovative
            evolution of MENA and surrounding emerging Market
          </section>
        </div>
        <table className="table">
          <tr>
            <th>Supported Methods</th>
            <th>Settlement window</th>
            <th>Fees</th>
          </tr>
          {gateway.supported_methods.map((method) => {
            return (
              <tr>
                <td>
                  <div className="method-identity">
                    <img src={method.logo} alt={method.name[language]} />
                    <p>{method.name[language]}</p>
                  </div>
                </td>
                <td>{method.settlementWindow[language]}</td>
                <td>{method.fee[language]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </Container>
  );
};

export default PaymentMethodCard;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.overlayColor};
  padding: 1rem;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 0.5rem;
  .gateway-identity {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .buttons {
    padding: 0.5rem 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .about {
    padding: 0 0.5rem;

    h6 {
      color: ${(props) => props.theme.mainColor};
    }
    section {
      margin-top: 1rem;
      font-size: 0.9rem;
      line-height: 25px;
    }
  }
  .table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      border: ${(props) => props.theme.border};
      text-align: center;
      padding: 0.75rem;
    }
    th {
      color: ${(props) => props.theme.mainColor};
    }
    td {
      font-size: 0.9rem;
    }
  }
  .method-identity {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0 0.25rem;
    }
  }
`;
