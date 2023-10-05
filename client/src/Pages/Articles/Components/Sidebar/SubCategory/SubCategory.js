import { useState } from 'react'
import { useParams } from 'react-router-dom'

import ArtilceLink from '../ArticleLink/ArtilceLink'
import getSubCategoryState from './Utility/getSubCategoryState'
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io' 

export default function SubCategory({subcategory, linkTo}) {
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState(getSubCategoryState(subcategory,id))

    
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
