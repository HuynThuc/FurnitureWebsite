import React from 'react';

const Banner = () => {
  return (
    <div className="relative p-6 mx-auto ">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Không Gian Sống Với MOHO</h2>
      </div>
      <div className="flex flex-wrap">
        {/* Cột 1: Phòng Khách và Phòng Ngủ */}
        <div className="w-full md:w-1/3 p-2">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <a href="https://moho.com.vn/collections/phong-khach" className="block">
                <img
                  className="w-full h-[357px] rounded-md object-cover"
                  src="/images/armchair.jpg"
                  alt="nội thất phòng khách"
                />
              </a>
            </div>
            <div className="relative">
              <a href="https://moho.com.vn/collections/phong-ngu" className="block">
                <img
                  className="w-full h-[357px] rounded-md object-cover"
                  src="/images/banan.jpg"
                  alt="nội thất phòng ngủ"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Cột 2: Trọn Bộ Sưu Tập */}
        <div className="w-full md:w-2/3 p-2">
          <div className="relative mb-[17px]">
            <a href="https://moho.com.vn/collections/bo-suu-tap-moi" className="block">
              <img
                className="w-full h-[430px] rounded-md object-cover"
                 src="/images/sofa.jpg"
                alt="Trọn bộ nội thất"
              />
            </a>
          </div>
          {/* Lưới nhỏ cho Phòng Ăn và Bếp */}
          <div className="flex flex-wrap ">
            <div className="w-full md:w-1/2 pr-2">
              <div className="relative">
                <a href="https://moho.com.vn/collections/phong-an" className="block">
                  <img
                    className="w-full h-[281px] rounded-md object-cover"
                    src="/images/giuong.jpg"
                    alt="nội thất phòng ăn"
                  />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <a href="https://moho.com.vn/pages/kitchen" className="block">
                  <img
                    className="w-full h-[281px] rounded-md object-cover"
                      src="/images/ghe.jpg"
                    alt="tủ bếp moho"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
