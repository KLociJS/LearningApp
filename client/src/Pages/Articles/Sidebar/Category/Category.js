import React, { useState } from 'react'
import ArtilceLink from '../ArticleLink/ArtilceLink'
import SubCategory from '../SubCategory/SubCategory'

export default function Category({ category }) {
    const [isOpen, setIsOpen] = useState(false)

    if(!isOpen){
        return <li onClick={()=>setIsOpen(true)}>{category.name}</li>
    }
    return (
        <>
            <li onClick={()=>setIsOpen(false)}>
                {category.name}
            </li>
            <ul>
                {category.subcategories.map(sub=>(<SubCategory key={sub.id} subcategory={sub}/>))}
                <ArtilceLink articles={category.articles}/>
            </ul>
        </>
    )
}
