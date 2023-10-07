import { Input } from 'Components'
import useUpdatePubishedArticle from './Hooks/useUpdatePubishedArticle'

export default function PublishUpdateModal({setShow}) {
    const {
        tags,
        setTags,
        description,
        setDescription,
        updatePublishHandler
    } = useUpdatePubishedArticle(setShow)

    return (
        <section className='modal' onClick={e=>e.stopPropagation()}>
            <h3 className='modal-header'>Publish article</h3>
            <Input label='Tags' inputValue={tags} setInputValue={setTags}/>
            <Input label='Description' inputValue={description} setInputValue={setDescription} />
            <button className='primary-button' onClick={updatePublishHandler}>Update</button>
            <button className='secondary-button' onClick={()=>setShow(false)}>Cancel</button>
        </section>
    )
}
