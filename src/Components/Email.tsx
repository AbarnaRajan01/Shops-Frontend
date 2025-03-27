import axios, { AxiosError } from "axios";
import React, { useState } from "react";

const Email: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");

    try {
      const response = await axios.post("http://localhost:7000/auth/login", {
        email,
        otp,
      });
      console.log(response.data);
      alert("Login successful");
      setUser(response.data.user);
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          setErrors(axiosError.response.data.message || "Login failed");
        } else {
          setErrors("No response received from server");
        }
      } else {
        setErrors("Login failed");
      }
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="form">
          <h1>Email Login</h1>
          {errors && <p style={{ color: "red" }}>{errors}</p>}

          <div className="labels">
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="labels">
            <label htmlFor="otp">OTP</label>
          </div>
          <div>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Email;
