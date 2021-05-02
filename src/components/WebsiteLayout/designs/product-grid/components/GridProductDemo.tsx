import styled from 'styled-components';

const GridProductDemo = () => {
  return (
    <Container>
      <div className="image-container">
        <img src="/images/product.webp" alt="name" />
      </div>
      <div className="content">
        <p className="name">Body Lotion Wax</p>
        <p className="description">Body lotion for soft skins </p>
        <div className="price-container">
          <p className="price">3.000 KD</p>
        </div>
      </div>
    </Container>
  );
};

export default GridProductDemo;
const Container = styled.div`
  border: ${props => props.theme.border};
  .image-container {
    display: block;
    position: relative;
    overflow: hidden;
    height: 175px;
    border-radius: 6px;
    background: #fff;
  }
  img {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  .content {
    padding: 0 0.25rem;
    .name {
      font-size: 1rem;
    }
    .description {
      margin: 0.25rem 0;
      color: ${props => props.theme.subHeading};
      font-size: 0.7rem;
    }
    .price-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price {
        font-size: 1.2rem;
      }
    }
  }
`;
