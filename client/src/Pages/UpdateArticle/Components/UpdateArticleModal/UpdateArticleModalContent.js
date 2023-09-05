import { useState } from 'react'

import { updateArticleUrl } from '_Constants/fetchUrl'

import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'
import { useParams } from 'react-router-dom'

export default function UpdateArticleModalContent({ markdown, title, setShow }){
    const [newTitle, setNewTitle] = useState(title)
    const { id } = useParams()

    const updateArticle = () => {
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
            setShow(false)
            console.log(data)
        })
        .catch(err=>console.log(err))
    }

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <Input label='Title' inputValue={newTitle} setInputValue={setNewTitle} />
            <button className='secondary-button mt-1' onClick={updateArticle}>
                Save 
                <RiSave2Line className='save-icon'/>
            </button>
            <button onClick={e=>setShow(false)} className='secondary-button center mt-1'>Close</button>
        </section>
    )
}

