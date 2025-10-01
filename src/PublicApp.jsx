import { HashRouter, Routes, Route } from "react-router-dom";
import PrivasiText from "./page/privasi/PrivasiText";
import TermOfService from "./page/privasi/TermOfService";
import LoadingOverlay from "./lib/LoadingOverlay";
import { Suspense } from "react";

function PublicApp() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/privasi"
          element={
            <Suspense fallback={<LoadingOverlay />}>
              <PrivasiText />
            </Suspense>
          }
        />
        <Route
          path="/termservice"
          element={
            <Suspense fallback={<LoadingOverlay />}>
              <TermOfService />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default PublicApp;