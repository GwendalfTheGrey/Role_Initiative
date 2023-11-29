import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </AuthProvider>
  );
}

export default App;
