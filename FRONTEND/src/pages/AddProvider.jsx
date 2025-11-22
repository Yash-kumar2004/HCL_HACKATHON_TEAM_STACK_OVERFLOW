import { useState } from "react";
import api from "../api";

export default function ProviderRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    experience: "",
    about: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const res = await api.post("/provider/register", form);
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Register Provider</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="degree" placeholder="Degree" onChange={handleChange} />
      <input name="experience" placeholder="Experience" onChange={handleChange} />
      <input name="about" placeholder="About" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />

      <button onClick={register}>Add Provider</button>
    </div>
  );
}
