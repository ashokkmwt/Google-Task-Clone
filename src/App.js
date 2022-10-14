import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Tasks />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
