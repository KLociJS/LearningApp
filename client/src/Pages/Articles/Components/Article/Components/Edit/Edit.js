import { Link, useParams } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import './Edit.css'
import  Modal from './Modal/Modal'
import ModalTriggerElement from './CategoryModal/ModalTriggerElement'
import EditModalContent from './CategoryModal/EditModalContent'
import { useState } from 'react'

export default function Edit() {
    const { id } = useParams()
    const [show, setShow] = useState(false)

    return (
        <div className='edit-icon-container'>
            <AiOutlineEdit className='edit-icon' onClick={()=>setShow(prev=>!prev)}/>
            { show ? 
                <div className='icon-menu'>
                    <Link to={`/update-article/${id}`} className='menu-item'>
                        Edit markdown
                    </Link>
                    <Modal 
                        modal={<EditModalContent />}
                        triggerElement={<ModalTriggerElement/>}
                    />
                </div>
                : 
                null
            }
        </div>

    )
}


