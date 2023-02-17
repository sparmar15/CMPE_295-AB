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
      <p className="h1">Search a ride</p><p/>

<form>
    <div className="form-group row">
        <label className="col-sm-2 col-form-label" >Departure Location</label>
        <div className="col-sm-10">
            <input  type="text" /><p />
        </div>
    </div>

    <div className="form-group row">
        <label className="col-sm-2 col-form-label" >Arrival Location</label>
        <div className="col-sm-10">
            <input  type="text" /><p />
    </div>
    </div>


    <div className="form-group row">
        <label className="col-sm-2 col-form-label" >Luggage Quantity</label>
        <div className="col-sm-10">
            <input type="text" /><p />
        </div>
    </div>

    <button type="submit" className="btn btn-primary mb-2">Submit</button>
</form>
    </div>
  );
}

export default Home;
