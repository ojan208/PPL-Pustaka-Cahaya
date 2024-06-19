// Book.js
import React from 'react';

const Book = ({ id, judul, penulis, harga, diskon, cover_img }) => {
  return (
    <div className="book">
      <img src={cover_img} alt={`${judul} cover`} />
      <div className="book-details">
        <h3>{judul}</h3>
        <p>{penulis}</p>
        <p>Price: {harga}</p>
        <p>Discount: {diskon}</p>
      </div>
    </div>
  );
};

export default Book;
