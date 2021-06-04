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

import AuthContext from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const CreateNewProduct = lazy(() => import("./pages/Product/CreateNewProduct"));
const Product = lazy(() => import("./pages/Product/Product"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Customers = lazy(() => import("./pages/Customers"));
const Categories = lazy(() => import("./pages/Categories"));
const Brands = lazy(() => import("./pages/Brands"));
const CreateNewCategory = lazy(
  () => import("./pages/Categories/CreateNewCategory")
);
const CreateNewBrand = lazy(() => import("./pages/Brands/CreateNewBrand"));
const Category = lazy(() => import("./pages/Categories/Category"));
const Brand = lazy(() => import("./pages/Brands/Brand"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
const Orders = lazy(() => import("./pages/Orders"));
const Order = lazy(() => import("./pages/Order"));
const Coupons = lazy(() => import("./pages/Coupons"));
const Coupon = lazy(() => import("./pages/Coupons/Coupon"));
const CreateNewCoupon = lazy(() => import("./pages/Coupons/CreateNewCoupon"));
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
const StoreIdentity = lazy(() => import("./pages/SettingsPages/StoreIdentity"));

const StoreProperties = lazy(
  () => import("./pages/SettingsPages/StoreProperties")
);
const StoreSEO = lazy(() => import("./pages/SettingsPages/StoreSEO"));
const ProductListGridCustomizer = lazy(
  () => import("./pages/ProductListGridCustomizer")
);
const Branch = lazy(
  () => import("./pages/SettingsPages/Branches&Warehouses/Branch")
);
const Warehouse = lazy(
  () => import("./pages/SettingsPages/Branches&Warehouses/Warehouse")
);
const CreateNewBranch = lazy(
  () => import("./pages/SettingsPages/Branches&Warehouses/CreateNewBranch")
);
const CreateNewWarehouse = lazy(
  () => import("./pages/SettingsPages/Branches&Warehouses/CreateNewWarehouse")
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
                          path="/products/product/create"
                          Component={CreateNewProduct}
                        />
                        <ProtectedRoute
                          path="/product/:id"
                          Component={Product}
                        />
                        <ProtectedRoute
                          path="/categories"
                          Component={Categories}
                        />
                        <ProtectedRoute
                          path="/categories/category/:id"
                          Component={Category}
                        />
                        <ProtectedRoute
                          path="/categories/create"
                          Component={CreateNewCategory}
                        />
                        <ProtectedRoute path="/brands" Component={Brands} />
                        <ProtectedRoute
                          path="/brands/brand/:id"
                          Component={Brand}
                        />
                        <ProtectedRoute
                          path="/brands/create"
                          Component={CreateNewBrand}
                        />
                        <ProtectedRoute path="/orders" Component={Orders} />
                        <ProtectedRoute path="/orders/:id" Component={Order} />
                        <ProtectedRoute
                          path="/customers"
                          Component={Customers}
                        />
                        <ProtectedRoute path="/coupons" Component={Coupons} />
                        <ProtectedRoute
                          path="/coupons/coupon/:id"
                          Component={Coupon}
                        />
                        <ProtectedRoute
                          path="/coupons/create"
                          Component={CreateNewCoupon}
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

                        <ProtectedRoute path="/settings" Component={Settings} />
                        <ProtectedRoute
                          path="/settings/account-settings"
                          Component={AccountSettings}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse"
                          Component={BranchesAndWarehouses}
                        />
                        <ProtectedRoute
                          path="/settings/store-properties"
                          Component={StoreProperties}
                        />
                        <ProtectedRoute
                          path="/settings/store-identity"
                          Component={StoreIdentity}
                        />
                        <ProtectedRoute
                          path="/settings/seo"
                          Component={StoreSEO}
                        />
                        <ProtectedRoute
                          path="/settings/staff"
                          Component={Staff}
                        />
                        <ProtectedRoute
                          path="/settings/staff/:id"
                          Component={StaffMember}
                        />
                        <ProtectedRoute
                          path="/settings/staff/member/create"
                          Component={CreateStaffMember}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse/branch/:id"
                          Component={Branch}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse/warehouse/:id"
                          Component={Warehouse}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse/create/warehouse"
                          Component={CreateNewWarehouse}
                        />
                        <ProtectedRoute
                          path="/settings/branch-warehouse/create/branch"
                          Component={CreateNewBranch}
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
