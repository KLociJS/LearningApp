import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function Article() {
    const { id } = useParams()
  return (
    <>{id}</>
  )
}
