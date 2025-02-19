import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import SignUp from './pages/AuthPages/SignUp';
import { AuthProvider } from './utils/Context';
import PostABlog from './pages/postBlog/PostABlog';
// import CreateHouse from './pages/HousePosting/CreateHouse';

const App = () => {
  return (
    <AuthProvider>
       <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/post_a_blog" element={<PostABlog />} />
      </Routes>
    </Router>
   </AuthProvider>
  );
};

export default App;
