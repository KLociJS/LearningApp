export default function ModalTriggerElement({ setShow, text }){

  return (
  <button
    className='menu-item'
    onClick={()=>setShow(true)}>
      {text}
  </button>
  )
}
