import React from 'react'

import './Button.css'

export default function Button({className,buttonText, handleClick}) {
  return (
    <button 
        className={className}
        onClick={handleClick}
    >
        {buttonText}
    </button>
  )
}
