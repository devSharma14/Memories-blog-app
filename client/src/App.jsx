import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Form from './components/form/Form';
import CreatePost from './components/create/CreatePost';
import Landing from './components/Landing';
import PostDetails from './components/PostDetails';

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home currentId={currentId} setCurrentId={setCurrentId} />} />
        {/* Ensure Form component handles or uses currentId if needed */}
        <Route path="/form" element={<Form currentId={currentId} setCurrentId={setCurrentId} />} />
        {/* Ensure CreatePost component handles or uses currentId if needed */}
        <Route path="/createPost" element={<CreatePost currentId={currentId} setCurrentId={setCurrentId} />} />
        {/* Dynamic route handling for PostDetails */}
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
