import React, { useState} from 'react';
import '../CardComponent/CardStyle.css'; // File CSS để tùy chỉnh giao diện card


const Card = () => {
  const [card, setCard] = useState([]);
  return (
    <div className="cards-container">
        {card.map((card, index) => ( // Sửa thành cardsData.map và thêm index để sử dụng làm key
          <div className="card" key={index}> {/* Sửa key thành index */}
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <div>
                  <p className="card-price">{card.price}</p>
                  <p className="card-discount">{card.discount}</p>
                </div>
                {/* Nếu muốn hiển thị mô tả, bạn cần cung cấp dữ liệu mô tả trong cardData */}
                {/* <p className="card-description">{card.description}</p> */}
              </div>
          
          </div>
        ))}
      </div>
  );
};

export default Card;
