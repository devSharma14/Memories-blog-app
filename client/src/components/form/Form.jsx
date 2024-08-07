import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import { signin, signup } from '../../actions/auth.js';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const initialState = { name: '', email: '', password: '' };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const response = await dispatch(signup(formData, navigate));
    if (response?.message) {
      toast.error(response.message); // Display error message using toast
    }
    if (response?.result) {
      setFormData(initialState);
      setAction("Login");
      toast.success("User registered successfully"); // Display success message using toast
    }
  };

  const handleLogin = async () => {
    const response = await dispatch(signin(formData, navigate));
    
    if (response?.message && response.message !== "User logged in successfully") {
      toast.error(response.message);
    }
    
    if (response?.result) {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/home");
      }, 6000); 
    }
  };
  
  

  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
  };

  return (
    <div className='container pt-40'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      
      <div className='inputs'>
        {action === "Sign Up" && (
          <div className='input'>
            <img src="person.png" alt="Person Icon" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
            />
          </div>
        )}
        
        <div className='input'>
          <img src="email.png" alt="Email Icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email Id'
          />
        </div>
        
        <div className='input'>
          <img src="password.png" alt="Password Icon" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
        </div>
        
        <div className="submit-container">
          {action === "Sign Up" ? (
            <div className="submit" onClick={handleSignUp}>
              Sign Up
            </div>
          ) : (
            <div className="submit" onClick={handleLogin}>
              Login
            </div>
          )}
        </div>
        <ToastContainer />

        <div className="toggle-action">
          {action === "Sign Up" ? (
            <button className="toggle-button" onClick={toggleAction}>
              Sign In
            </button>
          ) : (
            <button className="toggle-button" onClick={toggleAction}>
              Sign Up
            </button>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Form;
