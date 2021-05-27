import { useMemo } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import DateIconedInput from "../../../reusable/DateIconedInput";
import IconedInput from "../../../reusable/IconedInput";
import Select from "../../../reusable/Select";
import TableHead from "../../../reusable/TableHead";

interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}

const BranchWorkingHours = ({ control, errors, register }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const cols = useMemo(
    () => [
      { title: "days", sortable: false },
      { title: "from", sortable: false },
      { title: "to", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <div className="title-container">
        <h5>Branch Working Hours</h5>
      </div>
      <div className="box">
        <TableHead cols={cols} gridCols="1fr 0.5fr 0.5fr" />
        <div className="table">
          <CheckToggle
            control={control}
            label="Saturday"
            name="working_hours.saturday.enabled"
          />
        </div>
      </div>
    </Container>
  );
};

export default BranchWorkingHours;

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
.table {
    padding: 1rem;    
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media ${breakpoints.md} {
    .table {
        grid-template-columns: 1fr 0.5fr 0.5fr;
      }
  }
  `
);
