import { useState, useRef, useEffect } from 'react'

import { AiOutlineShareAlt } from 'react-icons/ai'

import  Modal from '../../../../../../Components/Modal/Modal'
import ModalTriggerElement from '../../../../../../Components/Modal/ModalTriggerElement'
import PublishArticleModalContent from './PublishArticleModalContent/PublishArticleModalContent'
import useArticle from 'Hooks/useArticle'
import PublishUpdateModal from './PublishUpdateModalContent/PublishUpdateModal'
import UnpublishArticleModal from './PublishUpdateModalContent/UnpublishArticleModal'

export default function Publish() {
    const [show, setShow] = useState(false)
    const { isPublished } = useArticle()

    const menuRef = useRef(null)

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false)
      }
    }
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    return (
        <div className='menu-container' ref={menuRef}>
            <AiOutlineShareAlt className='edit-icon' onClick={()=>setShow(prev=>!prev)}/>
            { show ? 
                <div className='dropdown-menu'>
                    {isPublished ? 
                        <>
                            <Modal
                                triggerElement={<ModalTriggerElement text='Edit Publish Details' className='menu-item'/>}
                                modalContent={<PublishUpdateModal/>}
                                />
                            <Modal 
                                triggerElement={<ModalTriggerElement text='Unpublish Article' className='menu-item'/>}
                                modalContent={<UnpublishArticleModal />}
                            />
                        </> : 
                        <>
                            <Modal 
                                modalContent={<PublishArticleModalContent />}
                                triggerElement={<ModalTriggerElement text='Publish Article' className='menu-item'/>}
                            />
                        </>
                    }
                </div>
                : 
                null
            }
        </div>
    )
}
