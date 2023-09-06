import { useState } from 'react'

import { postArticleUrl } from '_Constants/fetchUrl'

import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'

export default function ArticleForm({ markdown, setShow }){
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [title, setTitle] = useState('')

    const [isDisabled, setIsDisabled] = useState(false)

    const postArticle = () => {
        setIsDisabled(true)
        const article = {
            title,
            markdown,
            category: category === '' ? null : category,
            subcategory: subcategory === '' ? null : subcategory
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
            console.log(data)
        })
        .catch(err=>{
            setIsDisabled(false)
            console.log(err)
        })
    }

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <Input 
                label='Title' 
                inputValue={title} 
                setInputValue={setTitle}
                isDisabled={isDisabled}
            />
            <Input 
                label='Category' 
                inputValue={category} 
                setInputValue={setCategory}
                isDisabled={isDisabled}
            />
            <Input 
                label='Subcategory' 
                inputValue={subcategory} 
                setInputValue={setSubcategory}
                isDisabled={isDisabled}
            />
            <button 
                className='secondary-button mt-1' 
                onClick={postArticle} 
                disabled={isDisabled}
            >
                Save 
                <RiSave2Line className='save-icon'/>
            </button>
            <button 
                onClick={e=>setShow(false)} 
                className='secondary-button center mt-1' 
                disabled={isDisabled}>
                    Close
            </button>
        </section>
    )
}
