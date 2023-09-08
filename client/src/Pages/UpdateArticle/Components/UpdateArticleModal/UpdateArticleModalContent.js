import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'
import { useUpdateArticle } from 'Hooks'

export default function UpdateArticleModalContent({ markdown, title, setShow }){
    const {
        updateArticle,
        newTitle,
        setNewTitle,
        isDisabled
    } = useUpdateArticle(title,markdown,setShow)

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

