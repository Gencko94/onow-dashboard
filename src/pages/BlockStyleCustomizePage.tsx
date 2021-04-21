import { lazy, Suspense } from 'react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Loading from '../utils/Loading';
import Loadable from 'react-loadable';
const FooterCustomizer = lazy(
  () =>
    import(
      '../components/WebsiteLayout/BlockCustomizePage/FooterCustomizer/FooterCustomizer'
    )
);

const HeaderCustomizer = lazy(
  () =>
    import(
      '../components/WebsiteLayout/BlockCustomizePage/HeaderCustomizer/HeaderCustomizer'
    )
);

const BlockStyleCustomizePage = () => {
  const { type } = useParams<{ type: string }>();
  if (!type) {
    return <Redirect to="/website-layout" />;
  }
  return (
    <Suspense fallback={<p>Loading Styles</p>}>
      {type === 'header' && <HeaderCustomizer />}
      {type === 'footer' && <FooterCustomizer />}
    </Suspense>
  );
};

export default BlockStyleCustomizePage;
