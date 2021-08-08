import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import styled, { css } from "styled-components";
import { up } from "../../utils/themes";

interface IProps {
  cols: {
    sortable: boolean;
    title: string;
    cb?: () => void;
  }[];
  gridCols?: number | string;
  activeSortBy?: string;
  activeOrder?: "asc" | "desc";
  gap?: string;
}

const TableHead = ({
  cols,
  gridCols = cols.length,
  activeSortBy,
  activeOrder,
  gap = "1rem",
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Container gap={gap} cols={gridCols}>
      {cols.map((item) => {
        return (
          <Field
            key={item.title}
            onClick={() => item.cb?.()}
            active={activeSortBy === item.title}
            sortable={item.sortable}
          >
            {item.sortable &&
              (activeSortBy === item.title && activeOrder === "asc" ? (
                <BiChevronUp size={25} />
              ) : (
                <BiChevronDown size={25} />
              ))}
            <h6>{t(item.title)}</h6>
          </Field>
        );
      })}
    </Container>
  );
};

export default TableHead;
const Container = styled.div<{ cols: number | string; gap: string }>(
  ({ theme: { breakpoints, border }, cols, gap }) => `
    background-color:#fff;
    display:grid;
    // overflow-x:auto;
    grid-template-columns: ${
      typeof cols === "string" ? cols : `repeat(${cols},minmax(100px,1fr))`
    };
    gap:${gap};
    
    `
);
const Field = styled.button<{ active: boolean; sortable: boolean }>(
  ({
    theme: { breakpoints, border, subHeading, headingColor, font },
    active,
    sortable,
  }) => `
      border-bottom:${border};
  cursor:default;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 1rem 0;
  color: ${subHeading};
 
  h6 {
    transition: transform 75ms ease;
    font-weight: ${font.semibold};
    font-size: 0.8rem;
    
    margin:0 0.25rem;
  };
  ${
    sortable &&
    css`
      h6 {
        cursor: pointer;
        &:hover {
          transform: translateY(-2px);
        }
      }
    `
  };
  ${
    active &&
    css`
      color: ${headingColor};
      h6 {
        font-weight: 700;
      }
    `
  };
  ${up(breakpoints.md)}{
    h6 {
       font-size:0.8rem;
    };
  }
  
  `
);
