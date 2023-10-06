import CtaButton from './Components/CtaButton/CtaButton'
import LandingAnimation from './Components/LandingAnimation/LandingAnimation'
import SearchBar from './Components/SearchBar/SearchBar'

import './Home.css'
import Featured from './Components/Featured/Featured'

export default function Home() {
  return (
      <section className='hero-container'>
        <div className='hero-content'>
          <h1 className='landing-h1'>Level up your web development skills</h1>  
          <p className='landing-p'>Share and learn from fellow developers on Web Dev Notes.</p>
          <div className='landing-cta'>
            <SearchBar />
            <CtaButton />
          </div>
        </div>
        <LandingAnimation />
        <Featured />
      </section>
  )
}
