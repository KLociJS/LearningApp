import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import ArtilceLink from '../ArticleLink/ArtilceLink'
import SubCategory from '../SubCategory/SubCategory'
import getCategoryState from './Utility/getCategoryState'

import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io' 

export default function Category({ category, linkTo }) {
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState(getCategoryState(category,id))

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
                {category.subcategories.map(sub=>(<SubCategory key={sub.id} subcategory={sub} linkTo={linkTo}/>))}
                <ArtilceLink articles={category.articles} linkTo={linkTo}/>
            </ul>
        </>
    )
}
