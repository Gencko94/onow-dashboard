import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components";
import { PAYMENT_GATEWAY } from "../../../../interfaces/settings/payment-methods/payment-methods";
import Button from "../../../reusable/Button";
import Spacer from "../../../reusable/Spacer";
import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";
import Paragraph from "../../../StyledComponents/Paragraph";

interface IProps {
  gateway: PAYMENT_GATEWAY;
}

const PaymentMethodCard = ({ gateway }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const history = useHistory();
  return (
    <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1.5rem">
      <Flex items="center" justify="center" column>
        <img src={gateway.logo} alt={gateway.name.en} />

        <Spacer size={10} />
        <Flex column>
          <Button
            color="green"
            withTransition
            onClick={() =>
              history.push(
                "/settings/payment-methods/create-payment-gateway-account"
              )
            }
          >
            Create Bookeey Account
          </Button>
          <Spacer size={10} />
          <Button color="primary">Link Existing Bookeey Account</Button>
        </Flex>
      </Flex>

      <div className="about">
        <Heading tag="h6" type="medium-title">
          About {gateway.name[language]}
        </Heading>
        <Spacer size={10} />
        <section>
          <Paragraph fontSize="0.9rem">
            Xenon4pay is a local Kuwaity based company founded in September 2015
            operates in the ME and North Africa it offers a complete &
            comprehensive solution and believes in the Fast, Trendy & Innovative
            evolution of MENA and surrounding emerging Market
          </Paragraph>
        </section>
      </div>
      <Table>
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
      </Table>
    </Grid>
  );
};

export default PaymentMethodCard;
// const Container = styled.div`
//   border: ${(props) => props.theme.border};
//   background-color: ${(props) => props.theme.subtleBackground};
//   padding: 1rem;
//   border-radius: 6px;
//   display: grid;
//   grid-template-columns: 0.3fr 1fr;
//   gap: 0.5rem;
//   .gateway-identity {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//   }

//   .info {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 0.5rem;
//   }
//   .about {
//     padding: 0 0.5rem;
//   }
//   .table {
//     border-collapse: collapse;
//     width: 100%;
//     th,
//     td {
//       border: ${(props) => props.theme.border};
//       text-align: center;
//       padding: 0.75rem;
//     }
//     th {
//       color: ${(props) => props.theme.primary};
//     }
//     td {
//       font-size: 0.9rem;
//     }
//   }
//   .method-identity {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     p {
//       margin: 0 0.25rem;
//     }
//   }
// `;
const Table = styled.div`
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: ${(props) => props.theme.border};
    text-align: center;
    padding: 0.75rem;
  }
  th {
    color: ${(props) => props.theme.primary};
  }
  td {
    font-size: 0.9rem;
  }
`;
