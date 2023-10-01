import { TbPlayerTrackNextFilled } from 'react-icons/tb'
import { useState } from 'react'
import './CtaButton.css'

export default function CtaButton() {
    const [active, setActive] = useState(false)

    return (
        <button className='landing-button' onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
            Get started <TbPlayerTrackNextFilled className={`landing-button-icon ${active ? 'active' : ''}`}/>
        </button>
    )
}
