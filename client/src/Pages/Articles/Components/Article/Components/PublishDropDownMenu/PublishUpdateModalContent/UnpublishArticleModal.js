import useUnpublishArticle from "./Hooks/useUnpublishArticle"

export default function UnpublishArticleModal({setShow}) {
    
    const { unpublishHandler } = useUnpublishArticle(setShow)
    
    return (
        <section className='modal'>
            <h3 className='modal-header'>Unpublish article</h3>
            <button className='warning-button' onClick={unpublishHandler}>Unpublish</button>
            <button className='secondary-button' onClick={()=>setShow(false)}>Cancel</button>
        </section>
    )
}
