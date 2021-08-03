import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import Button from "../../reusable/Button";
import DefaultImage from "../../reusable/DefaultImage";
import EmptyTable from "../../reusable/EmptyTable";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

interface IProps {
  title: string;
  control: Control<any>;
  products: PRODUCT[];
  handleRemoveProduct: (id: number) => void;
}

const CouponProductsList = ({
  title,
  control,
  products,
  handleRemoveProduct,
}: IProps) => {
  const { i18n } = useTranslation();

  return (
    <Container>
      <div className="head">
        <Heading tag="h5" weight="bold">
          {title}
        </Heading>
      </div>
      <Controller
        control={control}
        name="special_products"
        render={({ field: { onChange } }) => {
          return (
            <div className="list">
              {products.length === 0 && (
                <EmptyTable height="100%" text="No Products Added" />
              )}
              {products.map((product: any) => (
                <div className="search-result">
                  <Grid cols="50px 1fr 50px" gap="0.25rem">
                    {product.image ? (
                      <img
                        className="img"
                        src={product.image}
                        alt={product.name[i18n.language]}
                      />
                    ) : (
                      <DefaultImage
                        circular
                        border
                        height="50px"
                        width="50px"
                      />
                    )}
                    <div className="info">
                      <p className="name">{product.name[i18n.language]}</p>
                      <p className="price">{product.price}</p>
                    </div>
                    <Button
                      bg="transparent"
                      padding="0.25rem"
                      Icon={MdCancel}
                      onClick={() => handleRemoveProduct(product.id)}
                    ></Button>
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
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: ${(props) => props.theme.accent2};
  .list {
    height: 300px;
    overflow-y: auto;
  }
  .search-result {
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    border-bottom: ${(props) => props.theme.border};
    &:hover {
      background-color: ${(props) => props.theme.highlightColor};
    }
    .img {
      height: 50px;
      width: 50px;
      border-radius: 50px;
      object-fit: cover;
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
