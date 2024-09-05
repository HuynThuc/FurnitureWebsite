import React, { useState, useEffect, useCallback, useMemo } from 'react';

import '../SliderComponent/SliderStyle.css';

const Slider = ({image, title}) => {
    

    return (
        <div class="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
         <img src={`/images/${image}`} alt="Banner Image" class="absolute inset-0 w-full h-full object-cover" />
        <div class="min-h-[500px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        </div>
        <div class="absolute bottom-12 left-64 z-50 text-white">
            <h1 class="shop-page-title is-xlarge pb-2 ">{title}</h1>
            <div class="is-small">
              <nav class="woocommerce-breadcrumb breadcrumbs">
                <a href="https://nhaxinh.com">Trang chủ</a>
                <span class="divider"> / </span>
                <a href="https://nhaxinh.com/danh-muc/phong-an/">Phòng ăn</a>
                <span class="divider"> / </span>Bàn ăn
              </nav>
            </div>
          </div>
      </div>
      
    );
};

export default Slider;
