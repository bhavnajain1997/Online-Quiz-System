import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score;
  const total = location.state?.total;

  return (
    <div style={{ textAlign: "center", marginTop: "100px", border: "1px solid black", maxWidth: "500px", marginLeft: "auto", marginRight: "auto", padding: "30px 20px" }}>
      <h1>Quiz Completed</h1>
      <h2>Quiz Result</h2>

      <h3>
        Your Score: {score} / {total}
      </h3>
       <div style={{display: "flex", justifyContent : "center", gap: "20px"}}>
        <button style={{padding: "5px 20px"}} onClick={() => navigate("/")}>
          Login
      </button>
      <button style={{padding: "5px 20px"}} onClick={() => navigate("/quiz")}>
        Restart Quiz
      </button>
       </div>
    </div>
  );
};

export default Result;