import styled from "styled-components";

import Heading from "../../StyledComponents/Heading";
type DefaultDivProps = Omit<JSX.IntrinsicElements["div"], "ref">;

interface BoxProps extends DefaultDivProps {
  type?: "titled" | "normal";
  boxTitle?: string;
}

const Box: React.FC<BoxProps> = ({ boxTitle, type = "normal", ...props }) => {
  if (type === "normal") {
    return <DefaultBox {...props}>{props.children}</DefaultBox>;
  } else {
    return (
      <TitledBox {...props}>
        <div className="box-title">
          <Heading tag="h5" type="small-title">
            {boxTitle}
          </Heading>
        </div>
        <div className="box-content">{props.children}</div>
      </TitledBox>
    );
  }
};

export default Box;

const DefaultBox = styled.div`
  background-color: ${(props) => props.theme.subtleFloating};
  padding: 0.5rem;
  border-radius: 6px;
  border: ${(props) => props.theme.border};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    padding: 1rem;
  }
`;

const TitledBox = styled(DefaultBox)`
  padding: 0;
  .box-title {
    padding: 0.75rem;
    border-bottom: ${(props) => props.theme.border};
  }
  .box-content {
    padding: 0.75rem;
    width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    padding: 0;
    .box-title {
      padding: 1rem;
    }
    .box-content {
      padding: 1rem;
    }
  }
`;
