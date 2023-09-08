import { RiSave2Line } from 'react-icons/ri'
import { Input } from 'Components'
import { usePostArticle } from 'Hooks'

export default function ArticleForm({ markdown, setShow }){
    const { 
        postArticle, 
        isDisabled, 
        setTitle, 
        setCategory, 
        setSubcategory,
        category,
        subcategory,
        title
    } = usePostArticle(markdown, setShow)

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
