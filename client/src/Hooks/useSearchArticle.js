import { useEffect, useState } from 'react'
import { searchArticle } from '_Constants/fetchUrl'

export default function useSearchArticle() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    useEffect(()=>{
        if(searchTerm.length>2){
        fetch(`${searchArticle}?title=${searchTerm}`,{
            method: 'POST',
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(res=>setSearchResult(res.data))
        .catch(err=>console.log(err))
        }else{
        setSearchResult([])
        }
    },[searchTerm])

    return {
        searchTerm,
        setSearchTerm,
        searchResult,
        setSearchResult,
        isFocused,
        setIsFocused
    }
}
