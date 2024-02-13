import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import burgerMenu from '../images/Burger-Menu.svg';


function Header() {
  return (
    <header className='header'>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div>
                    <Link className="navbar-brand link" to="/home">Typology</Link>
                </div>

                <button className="navbar-toggler burgerMenuButton" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">

                    <img src={burgerMenu} alt="Burger menu icon" />

                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav NavLinksList me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active link" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link" to="/createBlog">Create Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link" to="/">Pages</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </header>
  )
}

export default Header