import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { RiDeleteBinLine} from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

export default function Article() {
    const { id } = useParams()
    const { article } = useOutletContext()
    
    const deleteNote = () => {
      console.log('delete')
    }
    const editNote = () => {
      console.log('edit')
    }

  return (
    <>
      <section className='article-header'>
        <div>
          <h1 className='article-title'>{article.name}</h1>
          <p className='article-info'>Created by {article.creator} at {article.createdAt.toISOString().slice(0,10)}</p>
        </div>
        <div className='action-btn'>
          <AiOutlineEdit className='edit-icon' onClick={editNote}/>
          <RiDeleteBinLine className='delete-icon' onClick={deleteNote}/>
        </div>
      </section>
      <MarkdownPreview markdown={article.markdown}/>
    </>
  )
}
