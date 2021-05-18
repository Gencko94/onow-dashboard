import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";
import Login from "./pages/Login";
import ScrollToTopOnMount from "./utils/ScrollToTopOnMount";
import { lazy, Suspense } from "react";
import Loading from "./utils/Loading";
import ThemeProvider from "./contexts/ThemeContext";
import GlobalStyle from "./globalStyles";
import { ErrorBoundary } from "react-error-boundary";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-placeholder/lib/reactPlaceholder.css";
import Layout from "./layout/Layout";
// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import AddProduct from "./pages/AddProduct";
import AuthContext from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Customers = lazy(() => import("./pages/Customers"));
const Categories = lazy(() => import("./pages/Categories"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
const Orders = lazy(() => import("./pages/Orders"));
const Order = lazy(() => import("./pages/Order"));
const Coupons = lazy(() => import("./pages/Coupons"));
const Coupon = lazy(() => import("./pages/Coupon"));
const WebsiteLayout = lazy(() => import("./pages/WebsiteLayout"));
const HeaderCustomizer = lazy(() => import("./pages/HeaderCustomizer"));
const FooterCustomizer = lazy(() => import("./pages/FooterCustomizer"));
const Settings = lazy(() => import("./pages/SettingsPages/Settings"));
const Staff = lazy(() => import("./pages/StaffPages/Staff"));
const StaffMember = lazy(() => import("./pages/StaffPages/StaffMember"));
const CreateStaffMember = lazy(
  () => import("./pages/StaffPages/CreateStaffMember")
);
const AccountSettings = lazy(
  () => import("./pages/SettingsPages/AccountSettings")
);
const BranchesAndWarehouses = lazy(
  () => import("./pages/SettingsPages/BranchesAndWarehouses")
);
const ProductListGridCustomizer = lazy(
  () => import("./pages/ProductListGridCustomizer")
);

const DesignSelectionPage = lazy(() => import("./pages/DesignSelectionPage"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error!{" "}
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Router>
            <Suspense fallback={<Loading />}>
              <QueryClientProvider client={queryClient}>
                <AuthContext>
                  <ThemeProvider>
                    <GlobalStyle />
                    <ScrollToTopOnMount />
                    <Switch>
                      <Route exact path="/" component={Login} />
                      <Layout>
                        <ProtectedRoute
                          path="/dashboard"
                          Component={Dashboard}
                        />
                        <ProtectedRoute path="/products" Component={Products} />
                        <ProtectedRoute
                          path="/categories"
                          Component={Categories}
                        />
                        <ProtectedRoute path="/orders" Component={Orders} />
                        <ProtectedRoute path="/orders/:id" Component={Order} />
                        <ProtectedRoute
                          path="/customers"
                          Component={Customers}
                        />
                        <ProtectedRoute path="/coupons" Component={Coupons} />
                        <ProtectedRoute
                          path="/coupons/coupon"
                          Component={Coupon}
                        />
                        <ProtectedRoute
                          path="/website-layout"
                          Component={WebsiteLayout}
                        />
                        <ProtectedRoute
                          path="/website-layout/design-select/:type"
                          Component={DesignSelectionPage}
                        />
                        <ProtectedRoute
                          path="/website-layout/block-customize/header/:id"
                          Component={HeaderCustomizer}
                        />
                        <ProtectedRoute
                          path="/website-layout/block-customize/footer/:id"
                          Component={FooterCustomizer}
                        />
                        <ProtectedRoute
                          path="/website-layout/block-customize/product-grid/:id"
                          Component={ProductListGridCustomizer}
                        />
                        <ProtectedRoute
                          path="/customers/:id"
                          Component={CustomerProfile}
                        />
                        <ProtectedRoute
                          path="/products/new/:type"
                          Component={AddProduct}
                        />
                        <ProtectedRoute path="/settings" Component={Settings} />
                        <ProtectedRoute
                          path="/settings/account-settings"
                          Component={AccountSettings}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse"
                          Component={BranchesAndWarehouses}
                        />
                        <ProtectedRoute path="/staff" Component={Staff} />
                        <ProtectedRoute
                          path="/staff/:id"
                          Component={StaffMember}
                        />
                        <ProtectedRoute
                          path="/staff/create"
                          Component={CreateStaffMember}
                        />
                      </Layout>
                    </Switch>
                  </ThemeProvider>
                </AuthContext>
              </QueryClientProvider>
            </Suspense>
          </Router>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
