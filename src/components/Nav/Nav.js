import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    console.log( localStorage.getItem('token'));
    
    return (
        <nav className="navbar navbar-top">
            <div className="container-fluid">
                <div className="navbar-header col-md-12">
                    <span className="navbar-brand">User Management System</span>
                    {token &&
                        <Link to={'/'} onClick={() => { localStorage.clear() }} >
                            <button className="btn btn-success pull-right nav-logout-btn">Logout</button>
                        </Link>}
                </div>
            </div>
        </nav>
    )
}

export default Nav;