import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export type NavBarProps = {

}

function Navbar(prop : NavBarProps) {
  return (
    <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1" >Car Pooling App</span>
        <button type="button" className="btn btn-primary">Login</button>
     </nav>
  )
}

export default Navbar