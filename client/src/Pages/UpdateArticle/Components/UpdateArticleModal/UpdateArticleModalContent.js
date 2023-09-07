import { useState } from 'react'

import { updateArticleUrl } from '_Constants/fetchUrl'

import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'
import { useParams } from 'react-router-dom'

export default function UpdateArticleModalContent({ markdown, title, setShow }){
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

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <Input 
                label='Title'
                inputValue={newTitle}
                setInputValue={setNewTitle} 
                isDisabled={isDisabled}
            />
            <button 
                className='secondary-button mt-1'
                onClick={updateArticle}
                disabled={isDisabled}
            >
                Save 
                <RiSave2Line className='save-icon'/>
            </button>
            <button 
                onClick={()=>setShow(false)}
                className='secondary-button center mt-1'
                disabled={isDisabled}
            >
                Close
            </button>
        </section>
    )
}

