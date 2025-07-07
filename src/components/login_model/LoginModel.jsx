import { useState } from "react";
import styles from "./LoginModel.module.css";
import Cookies from "js-cookie";

const API = "/api";


const LoginModel = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");

  // const handleEmailSubmit = async () => {
  //   try {
  //     const res = await fetch(`${API}/users/login?email=${email}`);
  //     if (res.ok) {
  //       setStep("code");
  //       setError("");
  //     } else {
  //       setError("Failed to send code.");
  //     }
  //   } catch {
  //     setError("Server error.");
  //   }
  // };

  const handleEmailSubmit = async () => {
    try {
      const res = await fetch(`${API}/users/login?email=${email}`);
      const data = await res.json();

      if (res.ok && data.sucessful) {
        setStep("code"); // ✅ Move to code input
        setError("");
      } else {
        setError(data.message || "Failed to send code.");
      }
    } catch (err) {
      setError("Server error.");
      console.error("Error sending email code:", err);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const res = await fetch(`${API}/users/login?email=${email}&code=${code}`);
      const data = await res.json();
      if (res.ok && data.jwtAuthKey) {
        Cookies.set("authToken", data.jwtAuthKey, { expires: 7 });
        Cookies.set("userEmail", email, { expires: 7 });
        onSuccess(data.jwtAuthKey);
      } else {
        setError("Invalid code.");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <h2>{step === "email" ? "Enter your email" : "Enter 4-digit code"}</h2>
        {step === "email" ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button onClick={handleEmailSubmit}>Send Code</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="4-digit code"
            />
            <button onClick={handleCodeSubmit}>Verify Code</button>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginModel;
