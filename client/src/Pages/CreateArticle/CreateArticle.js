import { useState } from 'react'

import './CreateArticle.css'

import { RiSave2Line } from 'react-icons/ri'

import { MarkdownEditor, Modal } from 'Components'
import ArticleForm from './ArticleForm/ArticleForm'

export default function CreateArticle() {
    const [markdown, setMarkdown] = useState()

    return (
        <div className='editor-page-container'>
            <section className='controls'>
                <Modal modalButtonText='Save' icon={<RiSave2Line className='save-icon'/>}>
                    <ArticleForm markdown={markdown}/>
                </Modal>
            </section>
            <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown}/>
        </div>
    )
}
