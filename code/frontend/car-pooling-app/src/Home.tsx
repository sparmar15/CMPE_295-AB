import React from 'react';
import './Home.css'
import Header from './Header';
function Home() {
    return (
        <div className="home">
            <Header
                className='home_header'
                title='Car Pooling Application'
            ></Header>
            <p className="h1">Search a ride</p><p />

            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" >Departure Location</label>
                    <div className="col-sm-10">
                        <input type="text" /><p />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" >Arrival Location</label>
                    <div className="col-sm-10">
                        <input type="text" /><p />
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" >Luggage Quantity</label>
                    <div className="col-sm-10">
                        {/* <input type="text" /><p /> */}
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Luggage
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">No Luggage</a>
                                <a className="dropdown-item" href="#">Carry-On Only</a>
                                <a className="dropdown-item" href="#">Carry-On and Checked Bag</a>
                                <a className="dropdown-item" href="#">More than Two bags</a>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
        </div>
    );
}

export default Home;
