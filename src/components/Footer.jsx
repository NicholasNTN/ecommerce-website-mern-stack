import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
  return (
    <div className='f-container'>
      <div className="f-row">
        <div className="f-col">
          <img src="/images/logo/logo.png" alt="" />
          <p>Nicho Electronic commerce</p>
          <p>Nicho e-commerce Đây là một mô hình kinh doanh cho phép Nicho e-commerce thực hiện việc kinh doanh qua các mạng điện tử, đặc biệt là Internet.</p>
          <p>Made by Nicholas</p>
        </div>
        <div className="f-col">
          <h2>Quick Link</h2>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/shop'>Shop</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Category</h2>
          <ul>
            <li>
              <NavLink to='/'>Men</NavLink>
            </li>
            <li>
              <NavLink to='/'>Woment</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Stay in touch with us</h2>
          <div className="socials">
            <a href="/"><img src="/images/socials/facebook.png" alt="" /></a>
            <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
            <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
            <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
          </div>
        </div>
      </div>
      <div className="f-copyrow">
        <p>&copy; 2022. All Rights Reserved. Powered by Nicholas T.N </p>
      </div>
    </div>
  )
}

export default Footer