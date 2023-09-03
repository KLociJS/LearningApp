import React, { useState } from 'react'
import ArtilceLink from '../ArticleLink/ArtilceLink'

export default function SubCategory({subcategory}) {
    const [isOpen, setIsOpen] = useState(false)

    if(!isOpen){
        return <li onClick={()=>setIsOpen(true)}>{subcategory.name}</li>
    }
    
    return (
        <>
            <li onClick={()=>setIsOpen(false)}>{subcategory.name}</li>
            <ul>
                <ArtilceLink articles={subcategory.articles} />
            </ul>
        </>
        
    )
}
