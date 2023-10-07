export default function ModalTriggerElement({setShow}){
    return <button className='menu-item' onClick={()=>setShow(true)}>Change category</button>
}