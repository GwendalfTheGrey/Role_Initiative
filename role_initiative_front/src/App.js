import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { LevelsProvider } from "./context/LevelsContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <LevelsProvider>
          <Suspense>
            <Outlet />
          </Suspense>
      </LevelsProvider>
      <ScrollRestoration />
      <Footer />
    </AuthProvider>
  );
}

export default App;
