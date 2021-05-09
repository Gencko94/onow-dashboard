import { useQuery } from 'react-query';
import { Redirect, useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import FooterDemoReadOnly from '../components/WebsiteLayout/designs/footer/FooterDemoReadOnly';
import HeaderDemoReadOnly from '../components/WebsiteLayout/designs/header/HeaderDemoReadOnly';
import ProductGridDemo from '../components/WebsiteLayout/designs/product-grid/GridDemo';
import ProductGridDemoReadOnly from '../components/WebsiteLayout/designs/product-grid/GridDemoReadOnly';

import { getBlockDesigns } from '../utils/test-queries';

const DesignSelectionPage = () => {
  const { type } = useParams<{ type: string }>();
  const history = useHistory();
  const { data } = useQuery<any>(
    ['block-designs', type],
    () => getBlockDesigns(type),
    { enabled: Boolean(type) }
  );
  console.log(data);
  const renderReadOnlyDemos = (data: any) => {
    switch (type) {
      case 'header':
        return data?.map((item: any) => (
          <BlockStyle key={item.id}>
            <HeaderDemoReadOnly data={item} />
            <div className="btn-container">
              <Button selected={item.isSelected}>
                {item.isSelected ? 'Selected' : 'Select'}
              </Button>
              {item.isSelected && (
                <Button
                  onClick={() =>
                    history.push(
                      `/website-layout/block-customize/${type}/${item.id}`
                    )
                  }
                >
                  Customize
                </Button>
              )}
            </div>
          </BlockStyle>
        ));
      case 'footer':
        return data?.map((item: any) => (
          <BlockStyle key={item.id}>
            <FooterDemoReadOnly data={item} />
            <div className="btn-container">
              <Button selected={item.isSelected}>
                {item.isSelected ? 'Selected' : 'Select'}
              </Button>
              {item.isSelected && (
                <Button
                  onClick={() =>
                    history.push(
                      `/website-layout/block-customize/${type}/${item.id}`
                    )
                  }
                >
                  Customize
                </Button>
              )}
            </div>
          </BlockStyle>
        ));
      case 'product-grid':
        return data?.map((item: any) => (
          <BlockStyle key={item.id}>
            <ProductGridDemoReadOnly data={item} />
            <div className="btn-container">
              <Button selected={item.isSelected}>
                {item.isSelected ? 'Selected' : 'Select'}
              </Button>
              {item.isSelected && (
                <Button
                  onClick={() =>
                    history.push(
                      `/website-layout/block-customize/${type}/${item.id}`
                    )
                  }
                >
                  Customize
                </Button>
              )}
            </div>
          </BlockStyle>
        ));
    }
  };
  if (!type) {
    return <Redirect to="/website-layout" />;
  }
  return (
    <Container>
      <h4 className="title">Select your preferred {type} style </h4>
      {renderReadOnlyDemos(data!)}
    </Container>
  );
};

export default DesignSelectionPage;

const Container = styled.div`
  padding: 0.75rem;

  h4.title {
    margin-bottom: 1rem;
  }
`;
const BlockStyle = styled.div`
  border: ${props => props.theme.border};

  border-radius: 2px;
  margin-bottom: 2rem;

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-top: ${props => props.theme.border};
  }
`;
const Button = styled.button<{ selected?: boolean }>`
  background-color: ${props => (props.selected ? 'gray' : props.theme.green)};
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  color: #fff;
  margin: 0 1rem;
`;
