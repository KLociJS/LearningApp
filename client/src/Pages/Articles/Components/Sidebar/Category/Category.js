import React, { useState } from 'react'
import ArtilceLink from '../ArticleLink/ArtilceLink'
import SubCategory from '../SubCategory/SubCategory'

import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io' 

export default function Category({ category }) {
    const [isOpen, setIsOpen] = useState(false)

    if(!isOpen){
        return (
            <>
                <li className='category-li' onClick={()=>setIsOpen(true)}>
                    <IoMdArrowDropright/>
                    {category.name}
                </li>
            </>
        )
    }
    return (
        <>
            <li className='category-li active' onClick={()=>setIsOpen(false)}>
                <IoMdArrowDropdown />
                {category.name}
            </li>
            <ul className='subcategory-list'>
                {category.subcategories.map(sub=>(<SubCategory key={sub.id} subcategory={sub}/>))}
                <ArtilceLink articles={category.articles}/>
            </ul>
        </>
    )
}
