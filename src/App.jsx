import React from 'react';
import './App.css';
import Header from './layout/Header';
import PageContent from './layout/PageContent';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
}

export default App; 