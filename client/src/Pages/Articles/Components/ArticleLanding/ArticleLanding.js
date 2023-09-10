import React from 'react'

export default function ArticleLanding() {
  return (
    <>
      <header>
        <h1 className='heading-1'>Welcome to Learn notes!</h1>
        <p className='paragraph-light'>Unlock the power of efficient note-taking and organization with our user-friendly app. Whether you're a student, a professional, or just someone who loves to jot down ideas, Lear app is here to streamline your note-taking experience.</p>
      </header>
      <ul className='artilce-landing-ul'>
        <li className='heading-3'>Create Notes with Markdown
          <p className='paragraph-light'>You can easily create and format your notes using Markdown language.</p>
        </li >
        <li className='heading-3'>Organize Your Thoughts
          <p className='paragraph-light'>Create categories and subcategories to keep your notes neatly sorted.</p>
        </li>
        <li className='heading-3'>Share your notes
        <p className='paragraph-light'>Share your notes with others and contribute to the learning community.</p>
        </li>
      </ul>
    </>

  )
}
