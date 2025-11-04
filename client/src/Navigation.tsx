import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { UserList } from "./pages/UserList";
import { LoginPage } from "./pages/UserLogin";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { UserForm } from "./pages/UserForm";

function Navigation() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/create" element={<UserForm />}></Route>
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
