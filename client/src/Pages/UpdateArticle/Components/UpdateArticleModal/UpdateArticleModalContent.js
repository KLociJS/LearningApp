import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'
import { useUpdateArticle } from 'Hooks'

export default function UpdateArticleModalContent({ markdown, title, setShow }){
    const {
        updateArticle,
        newTitle,
        setNewTitle,
        isDisabled,
        titleError,
        setTitleError
    } = useUpdateArticle(title,markdown,setShow)

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <h1 className='heading-1'>Update article</h1>
            <Input 
                label='Title'
                inputValue={newTitle}
                setInputValue={setNewTitle} 
                isDisabled={isDisabled}
                hasError={titleError}
                setError={setTitleError}
            />
            {titleError ? <p className='error-msg'>{titleError}</p> : null}
            <div className='button-container mt-1'>
                <button 
                    className='secondary-button'
                    onClick={updateArticle}
                    disabled={isDisabled}
                >
                    Save 
                    <RiSave2Line className='save-icon'/>
                </button>
                <button 
                    onClick={()=>setShow(false)}
                    className='secondary-button align-right'
                    disabled={isDisabled}
                >
                    Close
                </button>
            </div>
        </section>
    )
}

