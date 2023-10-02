import { TbPlayerTrackNextFilled } from 'react-icons/tb'
import { useState } from 'react'
import './CtaButton.css'
import { useNavigate } from 'react-router-dom'
import { RoleBasedRender } from 'Components'

export default function CtaButton() {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()

    return (
        <RoleBasedRender allowedroles={['User']}>
            <button 
                className='landing-button'
                onMouseEnter={()=>setActive(true)}
                onMouseLeave={()=>setActive(false)}
                onClick={()=>navigate('/article')}
            >
                Get started <TbPlayerTrackNextFilled className={`landing-button-icon ${active ? 'active' : ''}`}/>
            </button>
        </RoleBasedRender>
    )
}
