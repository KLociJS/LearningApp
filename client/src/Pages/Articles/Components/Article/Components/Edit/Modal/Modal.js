import React, { useState } from 'react'
import './Modal.css'

export default function Modal({ modal, triggerElement }) {
    const [show, setShow] = useState(false)

    return (
        <>
            {show ? 
            <>
                {React.cloneElement(triggerElement, { setShow })}
                <div className='modal-container' onClick={()=>setShow(false)}>
                    {React.cloneElement(modal, { setShow })}
                </div>  
            </> : 
            <>
                {React.cloneElement(triggerElement, { setShow })}
            </>
            }
        </>
    )
}
