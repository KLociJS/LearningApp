import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'

import './Edit.css'

import { AiOutlineEdit } from 'react-icons/ai'

import  Modal from '../Modal/Modal'
import ModalTriggerElement from './CategoryModal/ModalTriggerElement'
import EditModalContent from './CategoryModal/EditModalContent'


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


