import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const Home = () => {
    const [staffPicks, setStaffPicks] = useState([]);
    const [promoItems, setPromoItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/buku',{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                 });
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setStaffPicks(data.data.List1);
                setPromoItems(data.data.List2);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="homepage-content">
                {error && <p>{error}</p>}
                
                <h2>Staff Picks</h2>
                <div className="book-list">
                    {staffPicks.map(data => (
                        <div key={data.BookID} className="book-item">
                            <img src={data.Cover} alt={data.Judul} />
                            <h3>{data.Judul}</h3>
                            <p>{data.Penulis}</p>
                            <p>{data.Harga}</p>
                        </div>
                    ))}
                </div>

                <h2>Promo Items</h2>
                <div className="book-list">
                    {promoItems.map(book => (
                        <div key={book.BookID} className="book-item">
                            <img src={book.Cover} alt={book.Judul} />
                            <h3>{book.Judul}</h3>
                            <p>{book.Penulis}</p>
                            <p>{book.Harga}</p>
                            {book.Diskon > 0 && <p>Discount: {book.Diskon}%</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
