import React, { useState } from "react";
import axios from "axios";
  import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", { name, email, password });
      toast(res.data.message);
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      toast(err.response.data.error);
    }
  };

return (
  <div className="form-container">
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  </div>
);
};

export default Signup;