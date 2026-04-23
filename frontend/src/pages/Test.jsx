import { useEffect } from "react";
import API from "../services/api";

function Test() {
  useEffect(() => {
    API.get("/api/resources")
      .then((res) => {
        console.log("API DATA:", res.data);
      })
      .catch((err) => {
        console.error("API ERROR:", err.response?.data || err.message);
      });
  }, []);

  return <h2>Check console for API data</h2>;
}

export default Test;