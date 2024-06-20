import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "../images/logo.png"
import Image from 'next/image';

const topnav = () => {
  return (
    <div>
      <div className="flex items-center flex justify-end">
        <div className="mr-2 m-2">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
          </span>
        </div>
        <div className='m-2'>
          <span className="input-group-text">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
          </span>
        </div>
        <div className='m-2'>
          <span className="input-group-text">
            <Image src={logo} alt="Logo" style={{width:"50px"}} />
          </span>
        </div>
        <div>
          <span className="input-group-text">
            <p>A-Team Care</p>
          </span>
        </div>
      </div>
      <hr style={{borderTop:" 1px solid #a99d9d"}} />
    </div>
  )
}

export default topnav
