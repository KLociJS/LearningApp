import { useState } from 'react'
import { publishArticle } from '_Constants/fetchUrl'

export default function usePublishArticle(id) {
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
        .then(res=>console.log(res))
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
