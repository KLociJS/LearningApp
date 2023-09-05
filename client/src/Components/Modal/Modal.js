import React, { useState } from 'react'

import './Modal.css'

export default function Modal({ children, modalButtonText, icon }) {
    const [show, setShow] = useState(false)

    return (
        <>
            {show ? 
            <>
                <button className='secondary-button'>
                    {modalButtonText}{icon}
                </button>
                <div className='modal-container' onClick={()=>setShow(false)}>
                    {React.cloneElement(children, { setShow })}
                </div>  
            </> :
            <button className='secondary-button' onClick={() => setShow(true)}>
                {modalButtonText}{icon}
            </button>
            }
        </>
    )
}

