import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ProvidersList() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await api.get("/provider/list");
        if (res.data.success) {
          setProviders(res.data.providers);
        }
      } catch (err) {
        console.error("Error loading providers:", err);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div>
      <h2>All Providers</h2>

      {providers.length === 0 && <p>No providers found</p>}

      <ul>
        {providers.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> – {p.degree}
            <br />
            <Link to={`/book/${p._id}`}>Book Appointment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
