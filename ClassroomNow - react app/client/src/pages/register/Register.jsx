import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [studentID, setStudentID] = useState("");
  const [role, setRole] = useState("");
  

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        department,
        studentID,
        role,
        password,
      });
      console.log(res.data);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle"><h1>Registration</h1></span>
      <form className="registerForm" onSubmit={handleSubmit}>
      
      <div className="temp">

      <div>
      <p>Username</p>
        <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />

      <p className="reg-label-holder">Department</p>
        <input
            className="registerInput"
            type="text"
            placeholder="Enter your department..."
            onChange={(e) => setDepartment(e.target.value)}
          />

        <p className="reg-label-holder">Email</p>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div>
        <p>Role</p>
        <select className="role-select" onChange={(e) => {
          const selectedRole = e.target.value;
          setRole( selectedRole); }}>
            <option value="Faculty">Faculty</option>
            <option value="CR">CR</option>
            <option value="Student">Student</option>
         </select>


         { (role=="Student"||role=="CR") &&
               < div>
                <p className="reg-label-holder">StudentID</p> 
                
               <input
                  className="registerInput"
                  type="text"
                  minLength={9}
                  maxLength={9}
                  placeholder="Enter your StudentID..."
                  onChange={(e) => setStudentID(e.target.value)}
                />
               </div>
                
        }
            
        <p className="reg-label-holder">Password</p>
            <input
              className="registerInput"
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            
        </div>
      </div>

      <div className="reg-btn-div">
        <button className="registerButton" type="submit">Register</button>
      </div>

      
        
      </form>
      {/* <button className="registerLoginButton">
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </button> */}
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
