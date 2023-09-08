import React ,{useState} from 'react'

export default function Modal({icon, children}) {

    const [show, setShow] = useState(false)

    return (
        <>
            {show ? 
            <>
                <div>
                    {icon}
                </div>
                <div className='modal-container' onClick={()=>setShow(false)}>
                    {React.cloneElement(children, { setShow })}
                </div>  
            </> :
            <div onClick={() => setShow(true)}>
                {icon}
            </div>
            }
        </>
    )
  
}
