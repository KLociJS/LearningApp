import useAuth from 'Hooks/useAuth'
import React, { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()

  console.log(user)

  useEffect(()=>{
    fetch('http://localhost:5000/api/Test',{
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
