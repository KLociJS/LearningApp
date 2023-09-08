import { useState } from 'react'

import { updateArticleUrl } from '_Constants/fetchUrl'

import { useParams } from 'react-router-dom'

export default function useUpdateArticle(title,markdown,setShow) {
    const [newTitle, setNewTitle] = useState(title)
    const [isDisabled, setIsDisabled] = useState(false)

    const { id } = useParams()

    const updateArticle = () => {
        setIsDisabled(true)
        const article = {
            title:newTitle,
            markdown
        }

        fetch( `${updateArticleUrl}${id}` ,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(article)
        })
        .then(res=>res.json())
        .then(data=>{
            setIsDisabled(false)
            setShow(false)
            console.log(data)
        })
        .catch(err=>{
            setIsDisabled(false)
            console.log(err)
        })
    }

    return {
        updateArticle,
        newTitle,
        setNewTitle,
        isDisabled
    }
}
