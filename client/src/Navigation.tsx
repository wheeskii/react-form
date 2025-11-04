import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { UserList } from "./pages/UserList";
import { LoginPage } from "./pages/UserLogin";
import { ProtectedRoute } from "./components/ProtectedRoutes";

function Navigation() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default Navigation;
