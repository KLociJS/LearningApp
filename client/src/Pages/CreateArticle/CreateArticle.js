import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'
import MarkdownTextArea from 'Components/MarkdownEditor/TextInput/MarkdownTextArea'
import React, { useState } from 'react'
import { RiSave2Line } from 'react-icons/ri'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import './CreateArticle.css'

export default function CreateArticle() {
    const [markdown, setMarkdown] = useState('')

    const postArticle = () => {
        const article = {
            title: 'Testticle',
            markdown
        }

        fetch('http://localhost:5000/api/Article',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(article)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }

    return (
        <>
            <section className='controls'>
                <IoArrowBackCircleOutline className='back-icon'/>
                <RiSave2Line className='save-icon' onClick={postArticle}/>
            </section>
            <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} />
            <MarkdownPreview markdown={markdown} />
        </>
    )
}
