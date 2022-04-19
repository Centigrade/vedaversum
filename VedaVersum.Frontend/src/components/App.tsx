import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CardsList from './cards-list/CardsList';
import Header from './common/Header';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Routes>
        <Route path="/" element={<CardsList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
