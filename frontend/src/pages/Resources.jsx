import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Resources() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  const fetchResources = () => {
    API.get("/resources")
      .then((res) => setResources(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await API.delete(`/resources/${id}`);
      fetchResources();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h2>Resources</h2>

          <button style={styles.addBtn} onClick={() => navigate("/add")}>
            + Add Resource
          </button>
        </div>

        {resources.length === 0 ? (
          <p>No resources found</p>
        ) : (
          <div style={styles.grid}>
            {resources.map((r) => (
              <div key={r.id} style={styles.card}>
                <h3 style={styles.title}>{r.title}</h3>

                <p style={styles.description}>{r.description}</p>

                <p style={styles.meta}>
                  <strong>Category:</strong>{" "}
                  {r.category_name ? r.category_name : "N/A"}
                </p>

                <p style={styles.meta}>
                  <strong>Added By:</strong>{" "}
                  {r.user_name ? r.user_name : "N/A"}
                </p>

                <div style={styles.actions}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    Visit
                  </a>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "2rem",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  addBtn: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #e5e7eb",
    padding: "1rem",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    marginBottom: "12px",
  },
  meta: {
    margin: "6px 0",
    color: "#374151",
    fontSize: "14px",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Resources;