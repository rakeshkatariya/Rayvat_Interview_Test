import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profilePhoto from './Image/user.png';

const Navbaar = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1>LOGO</h1>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Checkout">
                                        Cart ({totalQuantity})
                                    </NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/ ">
                                        <img src={profilePhoto} alt="Profile" className="profile-photo" style={{ width: '40px', height: '40px' }} />
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbaar;
