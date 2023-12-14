import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import { LevelsProvider } from "./context/LevelsContext";
import { Suspense } from "react";
import Loading from "./components/Loading/Loading";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { TTRPGProvider } from "./context/TTRPGContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <LevelsProvider>
        <TTRPGProvider>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </TTRPGProvider>
      </LevelsProvider>
      <ScrollRestoration />
      <Footer />
    </AuthProvider>
  );
}

export default App;
