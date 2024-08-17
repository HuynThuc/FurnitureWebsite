import React, { useState } from 'react';
import ShowroomImage1 from '../images/showroom-1.webp';

const Showroom = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone number: ${phoneNumber}`);
        console.log(`Message: ${message}`);
    };

    return (
        <div className="contact-address" style={{ marginTop: "150px", fontFamily: 'Arial, sans-serif' }}>
            <div className="container">
                <div className="contact-us flexMargin" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="col-md-6 col-sm-6 fade-box" style={{ flex: 1, marginTop: '120px' }}>
                        <img className=" lazyloaded" src={ShowroomImage1} alt="Liên hệ ngay" style={{ width: '650px', height: '440px' }} />
                    </div>
                    <div className="col-md-6 col-sm-6 pd_contact" style={{ flex: 1 }}>
                        <div className="title-info-contact" style={{ marginLeft: "50px" }}>
                            <h2>Experience Stores</h2>
                        </div>
                        <div className="box-info-contact">
                            <ul className="list-info" style={{ listStyleType: 'none', paddingLeft: 0, marginLeft: '50px' }}>
                                <li>
                                    <p>Địa chỉ chúng tôi</p>
                                    <p><strong><br />
                                        <b>[Ho Chi Minh City]</b><br />
                                        162 HT17, P. Hiệp Thành, Q. 12, TP. HCM (Nằm trong khuôn viên công ty SAVIMEX phía sau bến xe buýt Hiệp Thành) <br />
                                        Hotline: 0971 141 140<br /><br />
                                        S05.03-S18 phân khu The Rainbow | Vinhomes Grand Park, TP. Thủ Đức.<br />
                                        Hotline: 0931 880 424<br />
                                        <br /><br />
                                        <b>[Ha Noi City]</b><br />
                                        S3.03-Sh15 phân khu Sapphire | Vinhomes Smart City, Hà Nội .
                                        Hotline: 0909 665 728<br />
                                        <br />
                                        S2.09-Sh19 phân khu Sapphire | Vinhomes Ocean Park, Hà Nội.
                                        Hotline: 0938 108 772
                                    </strong></p>
                                </li>
                                <li>
                                    <p>Email chúng tôi<br /><strong>cskh@moho.com.vn</strong></p>
                                </li>
                                <li>
                                    <p>Điện thoại<br /><strong>097 114 1140 (Hotline/Zalo)</strong></p>
                                </li>
                                <li>
                                    <p>Thời gian làm việc<br /><strong>08:00 - 20:00 </strong><br /><strong>Thứ 2 - Chủ Nhật</strong></p>
                                </li>
                            </ul>
                        </div>
                        <div className="box-social-contact" style={{ marginRight: '500px' }}>
                            <div className="footer-follow-us">
                                <ul className="infoList-social social-icons">
                                    <a href="https://www.facebook.com/mohofurniture"><span><i className="fa-brands fa-facebook"></i></span></a>
                                    <a href="https://www.youtube.com/channel/UChrgCVzBmKda-7Q8MYFnSeg/featured"><span><i className="fa-brands fa-youtube"></i></span></a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d244.88041477358004!2d106.628675!3d10.881015!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a12d82e2df%3A0x569afdd3c76bcbbc!2zTuG7mWkgVGjhuqV0IE1PSE8!5e0!3m2!1svi!2sus!4v1714235877142!5m2!1svi!2sus" width="1900" height="500" style={{ border: 0, bottom: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='map-moho'></iframe>
            <div className="contact-form" style={{
                maxWidth: "800px",
                margin: "5px auto",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontFamily: 'Arial, sans-serif' }}>Gửi thắc mắc cho chúng tôi</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <label htmlFor="name">Tên của bạn:</label> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            placeholder="Tên của bạn"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "0px", fontFamily: 'Arial, sans-serif', background:'#fbfbfb' }}
                        />
                    </div>
                    <div className="input-group">
                        {/* <label htmlFor="email">Email của bạn:</label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            placeholder="Email của bạn"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "0px", marginTop: '10px', fontFamily: 'Arial, sans-serif' }}
                        />
                    </div>
                    <div className="input-group">
                        {/* <label htmlFor="phoneNumber">Số điện thoại của bạn:</label> */}
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            placeholder="Số điện thoại của bạn"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "0px", marginTop: '10px', fontFamily: 'Arial, sans-serif' }}
                        />
                    </div>
                    <div className="input-group">
                        {/* <label htmlFor="message">Nội dung:</label> */}
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            required
                            placeholder="Nội dung"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "0px", height: "150px", fontFamily: 'Arial, sans-serif', resize: 'none', marginTop: '10px' }}
                        />
                    </div>
                    <p style={{ textAlign: 'center', color: '#9e9e9e', fontFamily: 'Arial, sans-serif', fontSize:'13px' }}>This site is protected by reCAPTCHA and the <a style={{ textDecoration: 'none', color: '#2962ff' }} href='https://policies.google.com/privacy'>Google Privacy</a> Policy and <a style={{ textDecoration: 'none', color: '#2962ff' }} href='https://policies.google.com/terms'>Terms of Service</a> apply.</p>
                    <div style={{ textAlign: 'center', }}>
                        <button type="submit" style={{
                            backgroundColor: "#434343",
                            color: "white",
                            padding: "12px 20px",
                            border: "none",
                            borderRadius: "0px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                            marginTop: '10px',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight:'600',
                            textTransform:'uppercase',
                        }}>Gửi cho chúng tôi</button>
                    </div>
                </form>
            </div>
            {/* End Contact Form */}
        </div>
    );
}

export default Showroom;
