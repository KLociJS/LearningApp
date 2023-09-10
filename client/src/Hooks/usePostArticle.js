import { useState } from 'react'
import { postArticleUrl } from '_Constants/fetchUrl'
import { useNavigate } from 'react-router-dom'

export default function usePostArticle(markdown,setShow) {
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [title, setTitle] = useState('')
    const [titleError,setTitleError] = useState('')

    const [isDisabled, setIsDisabled] = useState(false)

    const navigate = useNavigate()

    const postArticle = () => {
        setIsDisabled(true)
        const article = {
            title,
            markdown,
            category: category === '' ? null : category,
            subcategory: subcategory === '' ? null : subcategory
        }

        if(title===''){
            setTitleError('Title is required')
            setIsDisabled(false)
            return
        }

        fetch( postArticleUrl ,{
            method: 'POST',
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
            navigate(`/article/${data.id}`)
        })
        .catch(err=>{
            setIsDisabled(false)
            console.log(err)
        })
    }

    return { 
        postArticle,
        isDisabled,
        setTitle,
        setCategory,
        setSubcategory,
        category, 
        subcategory, 
        title, 
        titleError, 
        setTitleError 
    }
}
