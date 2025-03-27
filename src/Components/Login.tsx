//

import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [useEmail, setUseEmail] = useState(true);
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginData = useEmail ? { email, otp } : { phone, otp };
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Login failed");
    }
  };

  const handleResendOTP = async () => {
    try {
      const resendData = useEmail ? { email } : { phone };
      const response = await axios.post(
        "http://localhost:7000/auth/resendOtp",
        resendData
      );
      setResendMessage(response.data.message);
    } catch (error) {
      setResendMessage("Failed to resend OTP");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          <input
            type="radio"
            checked={useEmail}
            onChange={() => setUseEmail(true)}
          />
          Login with Email
        </label>
        <label>
          <input
            type="radio"
            checked={!useEmail}
            onChange={() => setUseEmail(false)}
          />
          Login with Phone
        </label>
      </div>
      <form onSubmit={handleLogin}>
        {useEmail ? (
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
        ) : (
          <div>
            <label>
              Phone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <div>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleResendOTP}>Resend OTP</button>
      {resendMessage && <p>{resendMessage}</p>}
    </div>
  );
};

export default Login;
