import axios from "axios";
import React from "react";

const Register: React.FC = () => {
  const [name, setName] = React.useState(" ");
  const [email, setEmail] = React.useState(" ");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState(" ");
  const [errors, setErrors] = React.useState(" ");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        phone,
      });
      console.log(response.data);
      alert("user registarion successful");
      window.location.href = "/login";
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.message || "Registration failed");
      } else {
        setErrors("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="form">
        <h1>Registration Form</h1>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <div className="labels">
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            className="inputs"
            type="text"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="labels">
          <label htmlFor="Email">Email</label>
        </div>
        <div>
          {" "}
          <input
            className="inputs"
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="labels">
          <label htmlFor="Phone">Phone</label>
        </div>
        <div>
          {" "}
          <input
            className="inputs"
            type="tel"
            name="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="labels">
          <label htmlFor="Password">Password</label>
        </div>
        <div>
          {" "}
          <input
            className="inputs"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <MdOutlinePassword/> */}
        </div>
        <button className="btn">Register</button>
      </form>
    </>
  );
};

export default Register;
