import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/protected";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <Protected>
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/cars/:id" element={<CarPage />} />
            </Routes>
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;
