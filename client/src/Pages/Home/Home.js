import useAuth from 'Hooks/useAuth'
import React, { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()

  console.log(user)

  useEffect(()=>{
    fetch('https://localhost:7120/api/Test',{
      credentials: "include"
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div>a</div>
  )
}
