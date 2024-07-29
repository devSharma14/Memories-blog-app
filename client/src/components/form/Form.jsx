import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import { signin, signup } from '../../actions/auth.js';
import { useDispatch } from 'react-redux';

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
      alert(response.message);
    }
    if (response?.result) {
      setFormData(initialState);
      setAction("Login");
    }
  };

  const handleLogin = async () => {
    const response = await dispatch(signin(formData, navigate));
    if (response?.message) {
      alert(response.message);
    }
    if (response?.result) {
      navigate("/home");
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
