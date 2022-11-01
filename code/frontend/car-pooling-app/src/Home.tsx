import React from 'react';
import './Home.css'
import Header from './Header';
function Home() {
  return (
    <div className="home">
      <Header
      className = 'home_header'
      title= 'Car Pooling Application'
      ></Header>
    </div>
  );
}

export default Home;
