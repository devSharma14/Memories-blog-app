import React, { useEffect, useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import * as actionType from '../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  let Links = [
    { name: "HOME", link: "/home" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));

    if (storedUser) {
      dispatch({ type: actionType.AUTH, data: storedUser });
    }
  }, [dispatch]);

  useEffect(() => {
    const token = user?.token;
    console.log("token received: ", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch({ type: actionType.LOGOUT });
          navigate('/');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        dispatch({ type: actionType.LOGOUT });
        navigate('/');
      }
    }
  }, [user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
  };

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <BookOpenIcon className="w-7 h-7 text-blue-600" />
          <span>Memories</span>
        </div>

        <div onClick={() => setOpen(!open)} className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7">
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
          {Links.map((link, index) => (
            <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
              <Link to={link.link} className="text-gray-800 hover:text-blue-400 duration-500">{link.name}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold text-gray-800">
                Welcome, {user?.result?.name || 'User'}
              </li>
              <button onClick={handleLogout} className="bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleClick} className="bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
              Sign In
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
