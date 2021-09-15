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
const Container = styled.div<{ cols: number | string; gap: string }>`
  display: grid;
  border-radius: 20px 20px 0 0;

  grid-template-columns: ${(props) =>
    typeof props.cols === "string"
      ? props.cols
      : `repeat(${props.cols},minmax(100px,1fr))`};
  gap: ${(props) => props.gap};
`;

const Field = styled.button<{ active: boolean; sortable: boolean }>`
  border-bottom: ${(props) => props.theme.border};
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  color: ${(props) => props.theme.textAlt};

  h6 {
    transition: transform 75ms ease;
    font-weight: ${(props) => props.theme.font.semibold};
    font-size: 0.8rem;

    margin: 0 0.25rem;
  }
  ${(props) =>
    props.sortable &&
    css`
      h6 {
        cursor: pointer;
        &:hover {
          transform: translateY(-2px);
        }
      }
    `};
  ${(props) =>
    props.active &&
    css`
      color: ${(props) => props.theme.text};
      h6 {
        font-weight: 700;
      }
    `};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    h6 {
      font-size: 0.8rem;
    }
  }
`;
