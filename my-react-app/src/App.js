import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './Components/Navbar';
import Homepage from './Components/HomePage/Home';
import SearchResult from './Components/SearchResult';
import Signup from './Components/Signup';
import Sidebar from './Components/AppPage/Sidebar';
import Charts from './Components/AppPage/Charts';
import Trade from './Components/AppPage/Trade'
import AppSearchResult from './Components/AppPage/AppSearchResult'
import Dashboard from './Components/AppPage/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div>
        <div>
          
        </div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<><CustomNavbar /><Homepage /></>} />
            <Route path='/home' element={<><CustomNavbar /><Homepage/></>} />
  .          <Route path='/learn' element={<><CustomNavbar /><Homepage/></>} />
  .          <Route path='/about' element={<><CustomNavbar /><Homepage/></>} />
            <Route path='/signup' element={<><CustomNavbar /><Signup/></>} />
            <Route path="/search-results/*" element={<><CustomNavbar /><SearchResult/></>} />
            <Route path='/sidebar' element={<Sidebar/>} />
            <Route path='/charts' element={<Charts/>} />
            <Route path='/trade' element={<Trade/>} />
            <Route path='/app-search-results/*' element={<AppSearchResult/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
   .        <Route path="/*" element={<Homepage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
} 
export default App; 