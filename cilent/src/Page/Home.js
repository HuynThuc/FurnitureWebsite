import Footer from '../Component/FooterComponent/Footer';
import Header from '../Component/HeaderComponent/Header';
import Banner from '../Component/BannerComponent/Banner';
import Slider from '../Component/SliderComponent/Slider';
import Product from './Product';
import CategoryProduct from './CategoryProduct';
import Card from '../Component/CardComponent/Card';
import React, { useEffect, useState } from 'react';

function Home() {

    return (
      <div className='Home'>
        
        <Slider/>
        <Banner/>
        <Card/>
        <Product/>
        
        
        
      
      
      </div>
    );
  }
  
  export default Home;
  