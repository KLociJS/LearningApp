import { useEffect, useState } from 'react'
import { getArticleById } from '_Constants/fetchUrl'
import { useParams } from 'react-router-dom'
import { RiSave2Line } from 'react-icons/ri'
import MarkdownTextArea from 'Components/MarkdownEditor/TextInput/MarkdownTextArea'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'
import { Modal } from 'Components'
import UpdateArticleModalContent from './Components/UpdateArticleModal/UpdateArticleModalContent'

export default function UpdateArticle() {

    const [markdown, setMarkdown] = useState()
    const [title, setTitle] = useState()

    const { id } = useParams()

    useEffect(() => {
        fetch(`${getArticleById}${id}`, { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                setTitle(res.data.title)
                setMarkdown(res.data.markdown)
            })
            .catch(err => console.log(err))
    }, [id])

    if (!markdown) return null

    return (
        <>
            <section className='controls'>
                <Modal icon={<RiSave2Line className='save-icon' />}>
                    <UpdateArticleModalContent markdown={markdown} title={title}/>
                </Modal>
            </section>
            <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} />
            <MarkdownPreview markdown={markdown} />
        </>
    )
}
