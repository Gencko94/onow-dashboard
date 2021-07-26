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
import ApplicationContext from "./contexts/ApplicationContext";

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

const Settings = lazy(() => import("./pages/SettingsPages/Settings"));
const Staff = lazy(() => import("./pages/StaffPages/Staff"));
const StaffMember = lazy(() => import("./pages/StaffPages/StaffMember"));
const CreateStaffMember = lazy(
  () => import("./pages/StaffPages/CreateStaffMember")
);
const AccountSettings = lazy(
  () => import("./pages/SettingsPages/AccountSettings")
);
const Branches = lazy(() => import("./pages/SettingsPages/Branches"));
const StoreLogoAndFavicon = lazy(
  () => import("./pages/SettingsPages/StoreLogoAndFavicon")
);

const StoreInformation = lazy(
  () => import("./pages/SettingsPages/StoreInformation")
);
const WebsiteAppearance = lazy(
  () => import("./pages/SettingsPages/WebsiteAppearance")
);
const StoreCarousel = lazy(
  () => import("./pages/SettingsPages/WebsiteAppearance/StoreCarousel")
);
const ProductsView = lazy(
  () => import("./pages/SettingsPages/WebsiteAppearance/ProductsView")
);
const StoreSEO = lazy(() => import("./pages/SettingsPages/StoreSEO"));

const Branch = lazy(() => import("./pages/SettingsPages/Branches/Branch"));

const CreateNewBranch = lazy(
  () => import("./pages/SettingsPages/Branches/CreateNewBranch")
);

const StoreCurrencies = lazy(
  () => import("./pages/SettingsPages/Currencies/StoreCurrencies")
);
const StorePaymentMethods = lazy(
  () => import("./pages/SettingsPages/PaymentMethods/StorePaymentMethods")
);
const CreatePaymentGatewayAccount = lazy(
  () =>
    import("./pages/SettingsPages/PaymentMethods/CreatePaymentGatewayAccount")
);
const Reports = lazy(() => import("./pages/Reports"));

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
                    <ApplicationContext>
                      <GlobalStyle />
                      <ScrollToTopOnMount />
                      <Switch>
                        <Route exact path="/" component={Login} />
                        <Layout>
                          <ProtectedRoute
                            path="/dashboard"
                            Component={Dashboard}
                          />
                          <ProtectedRoute
                            path="/products"
                            Component={Products}
                          />
                          <ProtectedRoute
                            path="/products/product/create"
                            Component={CreateNewProduct}
                          />
                          <ProtectedRoute
                            path="/products/:id"
                            Component={Product}
                          />
                          <ProtectedRoute
                            path="/categories"
                            Component={Categories}
                          />
                          <ProtectedRoute
                            path="/categories/:id"
                            Component={Category}
                          />
                          <ProtectedRoute
                            path="/categories/category/create"
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
                          <ProtectedRoute
                            path="/orders/:id"
                            Component={Order}
                          />
                          <Route path="/customers" component={Customers} />
                          <Route path="/reports" component={Reports} />
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
                            path="/customers/:id"
                            Component={CustomerProfile}
                          />

                          <ProtectedRoute
                            path="/settings"
                            Component={Settings}
                          />
                          <ProtectedRoute
                            path="/settings/account-settings"
                            Component={AccountSettings}
                          />
                          <ProtectedRoute
                            path="/settings/branches"
                            Component={Branches}
                          />
                          <ProtectedRoute
                            path="/settings/store-information"
                            Component={StoreInformation}
                          />
                          <ProtectedRoute
                            path="/settings/payment-methods"
                            Component={StorePaymentMethods}
                          />
                          <ProtectedRoute
                            path="/settings/payment-methods/create-payment-gateway-account"
                            Component={CreatePaymentGatewayAccount}
                          />
                          <ProtectedRoute
                            path="/settings/store-logo-favicon"
                            Component={StoreLogoAndFavicon}
                          />
                          <ProtectedRoute
                            path="/settings/website-appearance"
                            Component={WebsiteAppearance}
                          />
                          <ProtectedRoute
                            path="/settings/website-appearance/store-carousel"
                            Component={StoreCarousel}
                          />
                          <ProtectedRoute
                            path="/settings/website-appearance/products-view"
                            Component={ProductsView}
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
                            path="/settings/branches/branch/:id"
                            Component={Branch}
                          />

                          <ProtectedRoute
                            path="/settings/branches/create/branch"
                            Component={CreateNewBranch}
                          />
                          <ProtectedRoute
                            path="/settings/store-currencies"
                            Component={StoreCurrencies}
                          />
                        </Layout>
                      </Switch>
                    </ApplicationContext>
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
