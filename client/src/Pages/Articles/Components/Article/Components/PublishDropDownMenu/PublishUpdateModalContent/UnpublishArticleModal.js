import useUnpublishArticle from "./Hooks/useUnpublishArticle"

export default function UnpublishArticleModal({setShow}) {
    
    const { unpublishHandler } = useUnpublishArticle(setShow)
    
    return (
        <section className='modal'>
            <h3 className='modal-header'>Unpublish article</h3>
            <button className='warning-button mt-1' onClick={unpublishHandler}>Unpublish</button>
            <button className='secondary-button mt-1' onClick={()=>setShow(false)}>Cancel</button>
        </section>
    )
}
