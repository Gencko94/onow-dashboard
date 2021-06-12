import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import EmptyTable from "../../reusable/EmptyTable";
import Grid from "../../StyledComponents/Grid";

interface IProps {
  title: string;
  control: Control<any>;
}

const CouponProductsList = ({ title, control }: IProps) => {
  const { i18n } = useTranslation();
  const special_products = useWatch({
    control,
    name: "special_products",
  });
  const handleRemoveProduct = (id: number, onChange: any) => {
    onChange(special_products.filter((i: any) => i.id !== id));
  };
  return (
    <Container>
      <div className="title">
        <h6>{title}</h6>
      </div>
      <Controller
        control={control}
        name="special_products"
        render={({ field: { onChange } }) => {
          return (
            <div className="list">
              {special_products.length === 0 && (
                <EmptyTable text="No Products Added" />
              )}
              {special_products.map((product: any) => (
                <div className="search-result">
                  <Grid cols="50px 1fr 50px" gap="0.25rem">
                    <img
                      src={product.image}
                      alt={product.name[i18n.language]}
                    />
                    <div className="info">
                      <p className="name">{product.name[i18n.language]}</p>
                      <p className="price">{product.price}</p>
                    </div>
                    <button
                      type="button"
                      className="icon"
                      onClick={() => handleRemoveProduct(product.id, onChange)}
                    >
                      <MdCancel size={25} />
                    </button>
                  </Grid>
                </div>
              ))}
            </div>
          );
        }}
      />
    </Container>
  );
};

export default CouponProductsList;
const Container = styled.div`
  .title {
    border-bottom: ${(props) => props.theme.border};
    padding: 0.75rem;
  }
  .list {
    height: 300px;
    overflow-y: auto;
    background-color: ${(props) => props.theme.overlayColor};
    border: ${(props) => props.theme.border};
    border-radius: 6px;
    /* padding: 1rem; */
    margin-top: 1rem;
  }
  .search-result {
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    border-bottom: ${(props) => props.theme.border};
    &:hover {
      background-color: ${(props) => props.theme.highlightColor};
    }
    .info {
      padding: 0.25rem;
      .name {
        font-size: 0.8rem;
        font-weight: ${(props) => props.theme.font.semibold};
      }
      .price {
        font-size: 0.8rem;
        font-weight: ${(props) => props.theme.font.semibold};
        color: ${(props) => props.theme.green};
      }
    }
    .icon {
      color: ${(props) => props.theme.dangerRed};
    }
  }
`;
