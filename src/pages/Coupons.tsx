import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import styled from "styled-components";
import CouponsList from "../components/Coupons/CouponsList/CouponsList";
import CouponsPanel from "../components/Coupons/CouponsPanel/CouponsPanel";
import Loading from "../utils/Loading";

const Coupons = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              Something went wrong , please try again
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<Loading />}></Suspense>
          <CouponsPanel />
          <CouponsList />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Coupons;
