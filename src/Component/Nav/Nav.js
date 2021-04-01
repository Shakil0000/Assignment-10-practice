import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Nav = () => {
    const [loggedIUser , setLoggedInUser] = useContext(UserContext);
    return (
        <div>
              <nav style={{backgroundColor:'skyBlue'}} class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PATHAO APP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/order">Order</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/admin">Admin</Link>
        </li>
      </ul>
      <span style={{position:'absolute',right:'0px'}} class="navbar-text">
        Name :- {loggedIUser.name}
      </span>
    </div>
  </div>
</nav>

        </div>
    );
};

export default Nav;