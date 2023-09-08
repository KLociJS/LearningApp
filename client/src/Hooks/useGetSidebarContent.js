import { useState, useEffect } from 'react'
import { getSidebarContentUrl } from '_Constants/fetchUrl'

export default function useGetSidebarContent() {
    const [sidebarContent, setSidebarContent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      fetch( getSidebarContentUrl ,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
          setSidebarContent(data)
          setIsLoading(false)
        })
        .catch(err=>console.log(err))
    },[])

    return { sidebarContent, setSidebarContent, isLoading }
}
