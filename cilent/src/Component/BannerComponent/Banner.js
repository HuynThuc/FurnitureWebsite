import React from 'react';

const Banner = () => {
  return (
    <div className="relative p-6">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Không Gian Sống Với MOHO</h2>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 p-2">
            <div className="flex flex-col">
              <div className="relative">
                <a href="https://moho.com.vn/collections/phong-khach" className="block">
                  <img
                    className="w-full h-auto rounded-md"
                    srcSet="//theme.hstatic.net/200000065946/1001187274/14/imgaView1_large.jpg?v=317 412w, //theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=317"
                    src="//theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=317"
                    alt="nội thất phòng khách"
                  />
                </a>
              </div>
              <div className="relative mt-4">
                <a href="https://moho.com.vn/collections/phong-ngu" className="block">
                  <img
                    className="w-full h-auto rounded-md"
                    srcSet="//theme.hstatic.net/200000065946/1001187274/14/imgaView2_large.jpg?v=317 412w, //theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=317"
                    src="//theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=317"
                    alt="nội thất phòng ngủ"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-2">
            <div className="relative">
              <a href="https://moho.com.vn/collections/bo-suu-tap-moi" className="block">
                <img
                  className="w-full h-auto rounded-md"
                  srcSet="//theme.hstatic.net/200000065946/1001187274/14/imgaView3_large.jpg?v=317 412w, //theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=317"
                  src="//theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=317"
                  alt="Trọn bộ nội thất"
                />
              </a>
            </div>
            <div className="flex flex-wrap mt-4">
              <div className="w-full md:w-1/2 p-1">
                <div className="relative">
                  <a href="https://moho.com.vn/collections/phong-an" className="block">
                    <img
                      className="w-full h-auto rounded-md"
                      srcSet="//theme.hstatic.net/200000065946/1001187274/14/imgaView4_large.jpg?v=317 412w, //theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=317"
                      src="//theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=317"
                      alt="nội thất phòng ăn"
                    />
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-1">
                <div className="relative">
                  <a href="https://moho.com.vn/pages/kitchen" className="block">
                    <img
                      className="w-full h-auto rounded-md"
                      srcSet="//theme.hstatic.net/200000065946/1001187274/14/imgaView5_large.jpg?v=317 412w, //theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=317"
                      src="//theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=317"
                      alt="tủ bếp moho"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
