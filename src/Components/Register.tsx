import axios from "axios";
import React from "react";
// import { MdOutlinePassword } from "react-icons/md";

const Register: React.FC = () => {
  const [name, setName] = React.useState(" ");
  const [email, setEmail] = React.useState(" ");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState(" ");
  const [errors, setErrors] = React.useState(" ");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:7000/auth/register", {
        name,
        email,
        password,
        phone,
      });
      console.log(response.data);
      alert("user registarion successful");
      window.location.href='/login'
    } catch (error) {
      console.log(error);
      alert("Registration failed");
      
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="form" >
        <h1>Registration Form</h1>
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
        <div className="labels">
          <label htmlFor="name">Name</label>
        </div>
        <div >
          <input className="inputs" type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="labels">
          <label htmlFor="Email">Email</label>
        </div>
        <div >
          {" "}
          <input className="inputs" type="email" name="email" value={email} required  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="labels">
          <label htmlFor="Phone">Phone</label>
        </div>
        <div >
          {" "}
          <input className="inputs" type="tel"  name="phone" value={phone} required  onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="labels">
          <label htmlFor="Password">Password</label>
        </div>
        <div >
          {" "}
          <input className="inputs" type="password" name="password" value={password} required  onChange={(e) => setPassword(e.target.value)}/>
          {/* <MdOutlinePassword/> */}
        </div>
        <button className="btn">Register</button>
        
      </form>
    </>
  );
};

export default Register