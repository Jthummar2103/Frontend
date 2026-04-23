import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navBtn = (active) => ({
    padding: "8px 14px",
    marginLeft: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    background: active ? "#2563eb" : "#444",
    color: "#fff",
    transition: "0.2s",
  });

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* 🔹 Logo */}
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/resources")}>
        Inventory App
      </h2>

      {/* 🔹 Buttons */}
      <div>
        <button
          style={navBtn(isActive("/resources"))}
          onClick={() => navigate("/resources")}
        >
          Resources
        </button>

        <button
          style={navBtn(isActive("/add"))}
          onClick={() => navigate("/add")}
        >
          Add
        </button>

        <button
          style={{
            ...navBtn(false),
            background: "#dc2626",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;