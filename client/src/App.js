import React, { Fragment } from 'react';
import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
const App = () => (
<BrowserRouter>
<Navbar />
  <Routes>
    <Route path="/" element={<Landing />} />
  </Routes>
</BrowserRouter>

)

export default App;
