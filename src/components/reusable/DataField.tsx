import React from "react";
import Paragraph from "../StyledComponents/Paragraph";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const DataField: React.FC<IProps> = React.forwardRef<HTMLDivElement, IProps>(
  ({ label, ...props }) => {
    return (
      <div {...props}>
        <Paragraph fontSize="0.9rem" weight="semibold" color="textAlt">
          {label}
        </Paragraph>
        <Paragraph weight="semibold" fontSize="1.1rem">
          {props.children}
        </Paragraph>
      </div>
    );
  }
);

export default DataField;
