import { useState } from 'react'

import './CreateArticle.css'

import { MarkdownEditor, Modal } from 'Components'
import PostArticleForm from './PostArticleForm/PostArticleForm'
import ModalTriggerElement from 'Components/Modal/ModalTriggerElement'

export default function CreateArticle() {
    const [markdown, setMarkdown] = useState()

    return (
        <div className='editor-page-container'>
            <section className='controls'>
                <Modal 
                    modalContent={<PostArticleForm markdown={markdown}/>}
                    triggerElement={<ModalTriggerElement text='Save' className='secondary-button'/>}
                />
            </section>
            <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown}/>
        </div>
    )
}
