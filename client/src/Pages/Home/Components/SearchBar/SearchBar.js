import React from 'react'
import './SearchBar.css'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
  return (
    <div className='searchbar-group'>
        <input className='searchbar' placeholder='Search articles'/>
            <AiOutlineSearch className='search-icon'/>
    </div>
  )
}
