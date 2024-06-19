// BookList.js
import React from 'react';
import Book from "./Book";
import Loading from "./Loader"; // Fixed typo here from "Loader" to "./Loader"
import coverImg from "./cover-not-avail.png"; // Ensure this path is correct

const BookList = ({ books, loading, resultTitle }) => {
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if (loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {booksWithCovers.slice(0, 30).map((item, index) => (
            <Book key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookList;
