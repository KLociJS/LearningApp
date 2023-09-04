import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'
import MarkdownTextArea from 'Components/MarkdownEditor/TextInput/MarkdownTextArea'
import React, { useState } from 'react'
import { RiSave2Line } from 'react-icons/ri'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import './CreateArticle.css'

export default function CreateArticle() {
    const [markdown, setMarkdown] = useState('')
    return (
        <>
            <section className='controls'>
                <IoArrowBackCircleOutline className='back-icon'/>
                <RiSave2Line className='save-icon'/>
            </section>
            <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} />
            <MarkdownPreview markdown={markdown} />
        </>
    )
}
