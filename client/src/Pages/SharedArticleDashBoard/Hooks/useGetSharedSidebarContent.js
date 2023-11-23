import { getSharedSidebarContent } from '_Constants/fetchUrl'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function useGetSharedSidebarContent() {
    const { id } = useParams()
    const [isSidebarLoading,setIsSidebarLoading] = useState(true)
    const [sidebarContent, setSidebarContent] = useState([])

    useEffect(()=>{
        fetch(`${getSharedSidebarContent}${id}`,{credentials:'include'})
        .then(res=>res.json())
        .then(data=>{
          setSidebarContent(data)
        })
        .catch(err=>console.log(err))
        .finally(_=>setIsSidebarLoading(false))
      },[id])

  return {
    sidebarContent,
    isSidebarLoading
  }
}
