import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Form from './components/form/Form';
import CreatePost from './components/create/CreatePost';

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route path="/form" element={<Form />} />
        <Route path="/createPost" element={<CreatePost currentId={currentId} setCurrentId={setCurrentId} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
