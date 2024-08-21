import Footer from '../Component/FooterComponent/Footer';
import Header from '../Component/HeaderComponent/Header';
import Banner from '../Component/BannerComponent/Banner';
import Slider from '../Component/SliderComponent/Slider';
import CategoryProduct from './CategoryProduct';
import Card from '../Component/CardComponent/Card';
import React, { useEffect, useState } from 'react';

function Home() {

    return (
      <div className='Home'>
        
        <Slider/>
        <Banner/>
        <Card/>
        
        
        
      
      
      </div>
    );
  }
  
  export default Home;
  