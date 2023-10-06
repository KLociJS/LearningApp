import { useParams } from 'react-router-dom'
import { useState } from 'react'

import './Publish.css'

import { AiOutlineShareAlt } from 'react-icons/ai'

import  Modal from '../Modal/Modal'
import ModalTriggerElement from '../Modal/ModalTriggerElement'
import PublishArticleModalContent from './PublishArticleModal/PublishArticleModalContent'
import useArticle from 'Hooks/useArticle'
import PublishUpdateModal from './PublishUpdateModal/PublishUpdateModal'
import UnpublishArticleModal from './PublishUpdateModal/UnpublishArticleModal'

export default function Publish() {
    const { id } = useParams()
    const [show, setShow] = useState(false)
    const { isPublished } = useArticle()

    return (
        <div className='edit-icon-container'>
            <AiOutlineShareAlt className='edit-icon' onClick={()=>setShow(prev=>!prev)}/>
            { show ? 
                <div className='icon-menu'>
                    {isPublished ? 
                        <>
                            <Modal
                                triggerElement={<ModalTriggerElement text='Edit Publish Details'/>}
                                modal={<PublishUpdateModal/>}
                                />
                            <Modal 
                                triggerElement={<ModalTriggerElement text='Unpublish Article'/>}
                                modal={<UnpublishArticleModal />}
                            />
                        </> : 
                        <>
                            <Modal 
                                modal={<PublishArticleModalContent />}
                                triggerElement={<ModalTriggerElement text='Publish Article'/>}
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
