import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollMagic from 'scrollmagic';

import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import HomeBlogsSection from '../components/HomeBlogsSection';
import CreateBlog from './CreateBlog';

function Home() {  

  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: '.HomeBodyContainer',
      triggerHook: 0,
      duration: '0%',
    })
    .setPin('.HomeBodyContainer', {pushFollowers: false})
    .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '.blogs-section',
      triggerHook: 0,
    })
    .setPin('.HomeBodyContainer', {pushFollowers: false})
    .addTo(controller);

  }, []);

  return (
    <div className='HomePage'>
        <Header />
        <HomeBody />
        <HomeBlogsSection />

        <Link to="/login">Log in</Link>
        <br />
        <Link to="/registration">registration</Link>
    </div>
  )
}

export default Home;