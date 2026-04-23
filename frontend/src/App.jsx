import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Resources from "./pages/Resources";
import AddResource from "./pages/AddResource";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/resources" /> : <Login />
          }
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/resources" /> : <Login />
          }
        />

        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddResource />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;