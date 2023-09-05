import { useState } from 'react'

import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'
import MarkdownTextArea from 'Components/MarkdownEditor/TextInput/MarkdownTextArea'

import './CreateArticle.css'

import { RiSave2Line } from 'react-icons/ri'

import { ArticleForm, Modal } from 'Components'

export default function CreateArticle() {
    const [markdown, setMarkdown] = useState('')

    return (
        <>
            <section className='controls'>
                <Modal modalButtonText='Save' icon={<RiSave2Line className='save-icon'/>}>
                    <ArticleForm markdown={markdown}/>
                </Modal>
            </section>
            <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} />
            <MarkdownPreview markdown={markdown} />
        </>
    )
}
