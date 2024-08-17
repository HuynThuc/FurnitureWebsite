import React from 'react';
import aboutUsImage1 from '../images/about-us-1.jpg';
import aboutUsImage2 from '../images/about-us-2.jpg';
import aboutUsImage3 from '../images/about-us-3.jpg';
import aboutUsImage4 from '../images/about-us-4.jpg';
import aboutUsImage5 from '../images/about-us-5.jpg';
import aboutUsImage6 from '../images/about-us-6.jpg';
import aboutUsImage7 from '../images/about-us-7.jpg';

const AboutUs = () => {
  return (
    <div className="about-us-container" style={{ marginTop: '10vw', paddingLeft: '24vw', paddingRight: '20vw', fontFamily: 'Arial, sans-serif', display: 'block' }}>
      <h2 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '30px' }}>Brand Story</h2>
      <p>
        Mỗi chi tiết, mỗi sản phẩm và hình ảnh của chúng tôi đều là những dấu ấn, là câu chuyện mà MOHO muốn gửi gắm đến mỗi khách hàng. Chúng tôi hi vọng trong từng bộ sưu tập, từng sản phẩm và dịch vụ của mình sẽ trở thành một phần trong tổ ấm của mỗi gia đình Việt, như một thông điệp <b>"mang yêu thương gửi trọn trong từng không gian sống"</b>. Hướng đến sự tiện ích, hiện đại tối giản và thân thiện môi trường là khát khao mà MOHO không ngừng theo đuổi.
      </p>
      <p>
        Chính những khát khao lan toả biến nhà thực sự là <b>"tổ ấm"</b>, tháng 03/2020, thương hiệu nội thất MOHO được định hình và ra đời. Là một phần của Savimex, với hơn 35 năm kinh nghiệm trong sản xuất và xuất khẩu nội thất sang các thị trường khó tính như Mỹ, Nhật, Hàn,... Chúng tôi tiếp tục kế thừa và phát huy nhằm mang đến cho người Việt những sản phẩm nội thất <b>100% made in Vietnam</b> theo tiêu chuẩn quốc tế, đảm bảo an toàn sức khoẻ với chi phí hợp lý.
      </p>
      <blockquote style={{ padding: '10px 20px', margin: '0 0 20px', fontSize: '17.5px', borderLeft: '5px solid #eee' }}><h3>Hướng Đến Giá Trị Bền Vững</h3></blockquote>
      <p>
        “Tính bền vững” là một khái niệm định nghĩa sự phát triển về mọi mặt nhưng vẫn đảm bảo sự tồn tại phát triển ở trạng thái cân bằng. Mang khái niệm “bền vững” vào trong sản phẩm - dịch vụ nội thất là bước đi tiên phong và đầy thách thức mà MOHO luôn không ngừng nỗ lực nhằm lan toả, truyền cảm hứng về một lối sống tích cực, tiêu dùng bền vững hơn vì một tương lai của hành tinh xanh.
      </p>
      <p>
        <b>Mục tiêu phát triển bền vững:</b>
        <ul style={{ listStyleType: 'none' }}>
          <li style={{ marginLeft: '-2.5em' }}>- Truyền cảm hứng về tiêu dùng bền vững đến mọi người tại Việt Nam.</li>
          <li style={{ marginLeft: '-2.5em' }}>- Sử dụng 100% nguồn nguyên liệu gỗ đạt <a style={{ color: '#000' }} href='https://fsc.org/en/about-us'>chứng nhận FSC® - Forest Stewardship Council®</a>.</li>
          <li style={{ marginLeft: '-2.5em' }}>- <a style={{ color: '#000' }} href='/warranty-policy'>Bảo trì trọn đời</a> sản phẩm nhằm kéo dài tuổi thọ và tính hữu dụng của sản phẩm trong thời gian dài.</li>
        </ul>
      </p>
      <p>
        Nội thất bền vững là một phần quan trọng của chúng tôi và chúng tôi tin rằng việc này có ý nghĩa lớn trong việc bảo vệ môi trường và tạo ra một tương lai bền vững.
      </p>
      <blockquote style={{ padding: '10px 20px', margin: '0 0 20px', fontSize: '17.5px', borderLeft: '5px solid #eee' }}>
        "Mặc dù, khái niệm nội thất bền vững tại Việt Nam chưa thực sự phổ biến nhưng những khái niệm như sống xanh, sử dụng vật liệu tái chế, thân thiện môi trường,... được khá nhiều khách hàng quan tâm hưởng ứng. Có thể thấy, nhận thức về tầm quan trọng của việc bảo vệ môi trường đã dần được nâng cao. Thông qua việc nỗ lực phát triển, đảm bảo 100% sản phẩm sử dụng các vật liệu bền vững, MOHO tin rằng sẽ góp phần nào thay đổi tích cực, hướng tới mục tiêu là thương hiệu nội thất bền vững tiên phong hàng đầu tại Việt Nam trong tương lai."
      </blockquote>
      <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Thân Thiện Môi Trường</h3>
      <p>
        MOHO mong muốn lan toả thông điệp <b>"Sống xanh"</b> và mỗi sản phẩm nội thất của chúng tôi đều bắt nguồn từ nguyên liệu gỗ đạt chuẩn FSC - khai thác từ nguồn rừng có trồng lại. Chúng tôi cam kết có trách nhiệm với cộng đồng và môi trường xanh của chúng ta. Giá trị tốt đẹp này không chỉ riêng MOHO mà mỗi khách hàng sử dụng sản phẩm của chúng tôi đều đóng góp và nhân rộng lên giá trị bền vững này.
      </p>
      <p>
        <img src={aboutUsImage1} alt="Thân Thiện Với Môi Trường" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <h3 style={{ fontSize: '20px', fontWeight: '700' }}>An Toàn Sức Khỏe</h3>
      <p>
        Đặt yếu tố <b>sức khoẻ và an toàn</b> khách hàng lên hàng đầu, các sản phẩm nội thất gỗ công nghiệp tại MOHO:
      </p>
      <p>
        <ul style={{ listStyleType: 'none' }}>
          <li style={{ marginLeft: '-2.5em' }}>- Đạt chứng nhận chứng nhận giảm phát thải Formaldehyde – CARB P2, đảm bảo gỗ không độc hại.</li>
          <li style={{ marginLeft: '-2.5em' }}>- Ưu tiên sử dụng sơn gốc nước thay cho sơn gốc dầu. </li>
          <li style={{ marginLeft: '-2.5em' }}>- Trang bị bộ anti tip kit tránh tình trạng tủ bị lật, gây nguy hiểm, đặc biệt là những gia đình có trẻ nhỏ.</li>
        </ul>
      </p>
      <p>
        Tại hầu hết các nước trên thế giới đều qui định nghiêm ngặt về tiêu chuẩn an toàn CARB - P2 đối với các sản phẩm gỗ công nghiệp, cũng như các yếu tố an toàn trong quá trình sử dụng, MOHO tin rằng việc tiên phong về tiêu chuẩn sức khoẻ - an toàn người dùng sẽ là điểm mạnh mang thương hiệu nội thất của người Việt vươn tầm quốc tế trong tương lai.
      </p>
      <p>
        <img src={aboutUsImage2} alt="An Toàn Sức Khỏe" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Chất Lượng Quốc Tế</h3>
      <p>Sản xuất trực tiếp tại nhà máy Savimex với công nghệ hiện đại cùng đội ngũ thợ tay nghề cao. </p>
      <p>
        <ul style={{ listStyleType: 'none' }}>
          <li style={{ marginLeft: '-2.5em' }}>- Nhà máy chế biến gỗ đầu tiên tại Việt Nam đạt chứng nhận hệ thống quản lý môi trường đạt chuẩn quốc tế ISO 14001.</li>
          <li style={{ marginLeft: '-2.5em' }}>- Rộng 10ha với hơn 1,500 công nhân viên giàu kinh nghiệm cùng máy móc công nghệ hiện đại. </li>
        </ul>
      </p>
      <p>
        <img src={aboutUsImage3} alt="Chất Lượng Quốc Tế" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <blockquote style={{ padding: '10px 20px', margin: '0 0 20px', fontSize: '17.5px', borderLeft: '5px solid #eee' }}>
        <h3>Tinh Tế Trong Từng Đường Nét</h3>
      </blockquote>
      <p>
        Chúng tôi tạo ra không gian sống tuyệt vời nhất, nơi chúng tôi gọi là “Nhà”.
      </p>
      <p>
        "Điều tôi muốn xây dựng ở đây là mang đến những thiết kế cao cấp dành riêng cho người Việt. Tôi muốn giúp khách hàng cá nhân hoá không gian sống thật sự phù hợp và lý tưởng. MOHO, chúng tôi làm tất cả vì khách hàng." Mr. Nicolai Lehn - Giám đốc thiết kế của MOHO.
      </p>
      <iframe width="1050" height="600" src="https://www.youtube.com/embed/DCa20zZvBto?si=tX_HCOYrWYjDzLWT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <blockquote style={{ padding: '10px 20px', margin: '0 0 20px', fontSize: '17.5px', borderLeft: '5px solid #eee', marginTop: '15px' }}>
        <h3>Trải Nghiệm Tốt Nhất</h3>
      </blockquote>
      <p>
        Tham quan và trải nghiệm cửa hàng nội thất của MOHO với lối kiến trúc không gian mở hiện đại, các sản phẩm nội thất được bố trí theo từng không gian và phong cách nội thất, mang đến trải nghiệm mua sắm tuyệt vời cho khách hàng.
      </p>
      <p>
        <img src={aboutUsImage4} alt="Trải Nghiệm Tốt Nhất - 1" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <iframe width="1050" height="600" src="https://www.youtube.com/embed/KlOlBrQ6k9w?si=IGkUbwct2SYmcv8N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <p style={{textAlign:'center'}}><b>Showroom</b>: <a href='https://maps.app.goo.gl/MLom9G988tskefQ1A' style={{ textDecoration: 'none'}}>162 HT17, P. Hiệp Thành, Q. 12, TP. HCM</a></p>
      <p>
        <img src={aboutUsImage5} alt="Trải Nghiệm Tốt Nhất - 2" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <iframe width="1050" height="600" src="https://www.youtube.com/embed/-3mnqMrNsEo?si=e4SFVeyHQCCkjNpn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <blockquote style={{ padding: '10px 20px', margin: '0 0 20px', fontSize: '17.5px', borderLeft: '5px solid #eee' }}>
        <h3>Các Chứng Nhận Của MOHO</h3>
      </blockquote>
      <p>
        <img src={aboutUsImage6} alt="Các Chứng Nhận Của Moho" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      <p>
        <img src={aboutUsImage7} alt="Các Chứng Nhận Của Moho" style={{ maxWidth: '100%', height: 'auto', verticalAlign: 'middle',display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </p>
      {/* Tiếp tục với phần nội dung còn lại */}
    </div>
  );
}

export default AboutUs;
