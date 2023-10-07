export default function ModalTriggerElement({ setShow, text, className }){

  return (
  <button
    className={className}
    onClick={()=>setShow(true)}>
      {text}
  </button>
  )
}
