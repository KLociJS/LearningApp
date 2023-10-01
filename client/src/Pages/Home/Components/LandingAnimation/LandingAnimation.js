import { TbBrandJavascript } from 'react-icons/tb'
import { BiLogoCss3, BiLogoHtml5, BiLogoReact, BiLogoNodejs, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiDotnet } from 'react-icons/si'

import './LandingAnimation.css'

const getIconPosition = (squareWidth,numOfPoints,i, iconSize) => {

    const effectivePerimeter = squareWidth * 4 - iconSize * 8;
    const radius = effectivePerimeter / (2 * Math.PI);

    const center = squareWidth / 2 -16

    const angle = (2 * Math.PI / numOfPoints) * i

    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)

    return {x,y}
}

const positions = Array(8).fill('').map((_,i)=>getIconPosition(200,8,i, 32))

console.log(positions)

export default function LandingAnimation() {
  return (
    <div className='hero-animation'>
      <div className='animated-box'>
          <BiLogoCss3 className='icon-1' style={{'top' : positions[0].x, left : positions[0].y}}/>
          <BiLogoHtml5 className='icon-2' style={{'top' : positions[1].x, left : positions[1].y}}/>
          <TbBrandJavascript className='icon-3' style={{'top' : positions[2].x, left : positions[2].y}}/>
          <BiLogoReact className='icon-4' style={{'top' : positions[3].x, left : positions[3].y}}/>
          <BiLogoNodejs className='icon-5' style={{'top' : positions[4].x, left : positions[4].y}}/>
          <SiDotnet className='icon-6' style={{'top' : positions[5].x, left : positions[5].y}}/>
          <BiLogoTypescript className='icon-7' style={{'top' : positions[6].x, left : positions[6].y}}/>
          <BiLogoTailwindCss className='icon-8' style={{'top' : positions[7].x, left : positions[7].y}}/>
      </div>
    </div>
  )
}
