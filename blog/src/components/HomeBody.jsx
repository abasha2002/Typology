import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Axios from 'axios';
import '../style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';



function HomeBody() {

  return (
    <section className="container-fluid HomeBodyContainer">
        <p className='backgroundLetter'>A</p>
        <div className='bodyTitle'>
          <h1>A Beautiful blog with no images required</h1>
          <div>
            <p>by <Link className='HomeLinks' to="/">Madison Barnett</Link></p>
            <p className='dash'>/</p>
            <Link className='HomeLinks' to="/">In Human</Link>
            <p className='dash'>/</p>
            <Link className='HomeLinks' to="/">5 Comments</Link>
          </div>

          <div>
            <button>Read On</button>
            
            <button>
              <FontAwesomeIcon icon={faBookmark} className='bookmark-icon' />
              Read Later
            </button>
          </div>
        </div>
    </section>
  )
}

export default HomeBody