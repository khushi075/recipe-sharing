import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/createPost/createPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>j
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
