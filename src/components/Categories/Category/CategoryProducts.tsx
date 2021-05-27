import { useMemo } from "react";
import { Control, SetFieldValue, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import TableHead from "../../reusable/TableHead";

interface IProps {
  register: any;
  errors: any;
  setValue: SetFieldValue<any>;
  control: Control<any>;
}

const CategoryProducts = ({ control, errors, register, setValue }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  const cols = useMemo(
    () => [
      { title: "Product Name", sortable: false },
      { title: "status", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <div className="title-container">
        <h5>Category Products</h5>
      </div>
      <div className="box">
        <TableHead cols={cols} />
      </div>
    </Container>
  );
};

export default CategoryProducts;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
   
  }
  
  
  @media ${breakpoints.md} {
    .box {
      
    }
   
  }
  `
);
