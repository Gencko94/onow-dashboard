import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import styled, { css } from "styled-components";

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
    grid-template-columns: ${
      typeof cols === "string" ? cols : `repeat(${cols},1fr)`
    };
    gap:${gap};
    border-bottom:${border};

    `
);
const Field = styled.button<{ active: boolean; sortable: boolean }>(
  ({
    theme: { breakpoints, subHeading, headingColor, font },
    active,
    sortable,
  }) => `
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 1rem 0;
  color: ${subHeading};
 
  transition: transform 75ms ease;
  h6 {
    font-weight: ${font.semibold};
    font-size: 0.8rem;
    
    margin:0 0.25rem;
  };
  ${
    sortable &&
    css`
      h6 {
        cursor: pointer;
      }
      &:hover {
        transform: translateY(-2px);
        h6 {
          font-weight: ${font.bold};
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
  @media ${breakpoints.xl} {
    h6 {
       font-size:0.8rem;
    };
  }
  
  `
);
