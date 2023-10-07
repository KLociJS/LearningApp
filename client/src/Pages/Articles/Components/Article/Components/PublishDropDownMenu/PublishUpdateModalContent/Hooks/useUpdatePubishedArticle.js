import { updatePublishedArticle } from '_Constants/fetchUrl'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function useUpdatePubishedArticle(setShow) {
    const { id } = useParams()
    const [tags,setTags] = useState('')
    const [description,setDescription] = useState('')

    const updatePublishHandler = () =>{
        const updatedArticleDetails = {
            tags: tags.split(', '),
            description
        }
        fetch(`${updatePublishedArticle}${id}`, {
            method: 'PATCH',
            headers:{
                "content-type" : "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(updatedArticleDetails)
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setShow(false)
        })
        .catch(err=>console.log(err))
    }

    return {
        tags,
        setTags,
        description,
        setDescription,
        updatePublishHandler
    }
}
