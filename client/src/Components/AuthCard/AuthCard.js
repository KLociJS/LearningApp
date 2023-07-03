import React from 'react'
import './AuthCard.css'

export default function AuthCard({inputs, icon : Icon, button, heading}) {
  return (
    <div className='auth-card'>
      {Icon}
      <h2 className='auth-heading'>{heading}</h2>
      {inputs.map((Component, index) => (
        <>{Component}</>
      ))}
      {button}
    </div>
  )
}
