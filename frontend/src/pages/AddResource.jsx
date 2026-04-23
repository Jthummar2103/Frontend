import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddResource() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category_id: "", //  empty initially
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/resources", form);

      alert("Resource Added");
      navigate("/resources");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding resource");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "2rem" }}>
        <h2>Add Resource</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />

          <br /><br />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            name="link"
            placeholder="Link"
            onChange={handleChange}
            required
          />

          <br /><br />

          {/* CATEGORY DROPDOWN */}
<select name="category_id" onChange={handleChange} required>
  <option value="">Select Category</option>
  <option value="1">General</option>
  <option value="2">Books</option>
  <option value="3">Videos</option>
  <option value="4">Tutorials</option>
  <option value="5">Notes</option>
  <option value="6">Tools</option>
</select>
          <br /><br />

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddResource;