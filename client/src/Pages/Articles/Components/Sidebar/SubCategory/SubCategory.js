import React, { useState } from 'react'
import ArtilceLink from '../ArticleLink/ArtilceLink'
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io' 

export default function SubCategory({subcategory, linkTo}) {
    const [isOpen, setIsOpen] = useState(false)

    if(!isOpen){
        return (
            <li className='category-li' onClick={()=>setIsOpen(true)}>
                <IoMdArrowDropright />
                {subcategory.name}
            </li>
        )
    }

    return (
        <>
            <li className='category-li active' onClick={()=>setIsOpen(false)}>
                <IoMdArrowDropdown />
                {subcategory.name}
            </li>
            <ul className='article-list'>
                <ArtilceLink articles={subcategory.articles} linkTo={linkTo}/>
            </ul>
        </>
        
    )
}
