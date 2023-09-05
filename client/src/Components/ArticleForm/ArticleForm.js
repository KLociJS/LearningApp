import { useState } from 'react'

import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'

export default function ArticleForm({ markdown, setShow }){
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [title, setTitle] = useState('')

    const postArticle = () => {
        const article = {
            title,
            markdown,
            category: category === '' ? null : category,
            subcategory: subcategory === '' ? null : subcategory
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
        .then(data=>{
            setShow(false)
            console.log(data)
        })
        .catch(err=>console.log(err))
    }

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <Input label='Title' inputValue={title} setInputValue={setTitle} />
            <Input label='Category' inputValue={category} setInputValue={setCategory}/>
            <Input label='Subcategory' inputValue={subcategory} setInputValue={setSubcategory}/>
            <button className='secondary-button mt-1' onClick={postArticle}>
                Save 
                <RiSave2Line className='save-icon'/>
            </button>
            <button onClick={e=>setShow(false)} className='secondary-button center mt-1'>Close</button>
        </section>
    )
}
