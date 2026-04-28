import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill all details");
      return;
    }

    axios.post("http://localhost:5000/login", {
      email,
      password
    })
    .then((res) => {
      alert(res.data.message);
      navigate("/quiz"); // success → quiz page
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
  };

  return (
    <div style={{
      marginTop: "150px",
      border: "1px solid black",
      maxWidth: "450px",
      padding: "40px 20px",
      marginLeft: "auto",  
      marginRight: "auto"
    }}>
      <h2 style={{textAlign: "center"}}>Login Page</h2>

      <form onSubmit={handleLogin}>
        <label style={{textAlign: "Left !important", padding : "10px 0px", display: "block"}}>Email</label>
        <input
          type="text"
          value={email}
          style={{padding:"8px"}} size={60}
          onChange={(e) => setEmail(e.target.value)}
        />
        
       <br></br>
        <label style={{textAlign: "Left !important", padding : "10px 0px", display: "block",marginTop: "20px"}}>Password</label>
        <input
          type="password"
          value={password}
          style={{padding: "8px"}} size={60}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button style={{display: "block", margin:"45px auto 0", padding: "5px 20px"}} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;