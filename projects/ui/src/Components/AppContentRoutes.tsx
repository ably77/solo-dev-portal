import { Route, Routes } from "react-router-dom";
import { ApiDetailsPage } from "./ApiDetails/ApiDetailsPage";
import { ApisPage } from "./ApisList/ApisPage";
import { HomePage } from "./Home/HomePage";
import { Footer } from "./Structure/Footer";
import { UsagePlansPage } from "./UsagePlans/UsagePlans";
import { ErrorBoundary } from "./Common/ErrorBoundary";

function AppContentRoutes() {
  return (
    <div className="MainContentContainer">
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback="There was an issue loading the Platform">
              <HomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/apis"
          element={
            <ErrorBoundary fallback="There was an issue displaying the list of APIs">
              <ApisPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/api-details/:apiId"
          element={
            <ErrorBoundary fallback="There was an issue displaying details about that API">
              <ApiDetailsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/usage-plans"
          element={
            <ErrorBoundary fallback="There was an issue displaying the list of Usage Plans">
              <UsagePlansPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/usage-plans/:apiId"
          element={
            <ErrorBoundary fallback="There was an issue displaying information about the Usage Plan">
              <UsagePlansPage />
            </ErrorBoundary>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default AppContentRoutes;
