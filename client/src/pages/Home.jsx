import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero';
import Features from '../components/home/Features'
import Texttimonials from '../components/home/Texttimonials';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Texttimonials/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}

export default Home