import { MoonLoader } from "react-spinners"

export default function Loading({size = 60, hexColor = '#002147'}) {
  return (
    <div className='full-width-container'>
        <MoonLoader 
            size={size}
            color={hexColor}
        />
    </div>
  )
}
