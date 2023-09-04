import React from 'react'
import { useParams } from 'react-router-dom'

export default function Article() {
    const { id } = useParams()
    console.log(id)
    console.log(id)

  return (
    <>{id}</>
  )
}
