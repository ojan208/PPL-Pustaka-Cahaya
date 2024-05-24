import React, { Component } from 'react';
import './Menu.css';
 
class Menu extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <a href="https://www.pustakacahaya.com" className="logo"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c1ddd7821bb13bb3053ca341555782ab481c33cb57aa45621205b37f52996d6?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"></img></a>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><a href="#work">Masuk</a></li>
                    </ul>
                </header>
            </div>
        );
    }
}
 
export default Menu;
