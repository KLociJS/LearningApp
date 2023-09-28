import { RiSave2Line } from 'react-icons/ri'
import { MarkdownEditor, Modal } from 'Components'
import UpdateArticleModalContent from './Components/UpdateArticleModal/UpdateArticleModalContent'
import { useGetArticle } from 'Hooks'

export default function UpdateArticle() {
    const { 
        markdown, 
        setMarkdown, 
        title,
        isLoading
      } = useGetArticle()

    if (isLoading) return null

    return (
        <div className='editor-page-container'>
            <section className='controls'>
                <Modal modalButtonText='Save' icon={<RiSave2Line className='save-icon' />}>
                    <UpdateArticleModalContent markdown={markdown} title={title}/>
                </Modal>
            </section>
            <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown}/>
        </div>
    )
}
