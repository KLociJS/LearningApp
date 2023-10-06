import { useState } from 'react'
import { publishArticle } from '_Constants/fetchUrl'
import { useParams } from 'react-router-dom'

export default function usePublishArticle(setShow) {
    const { id } = useParams()
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')

    const publishArticleHandler = () =>{
        const article = {
            description,
            tags: tags.split(', ')
        }

        fetch(`${publishArticle}${id}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(article)
        })
        .then(res=>res.json())
        .then(_=>setShow(false))
        .catch(err=>console.log(err))
    }   

  return {
    description,
    setDescription,
    tags,
    setTags,
    publishArticleHandler
  }
}
