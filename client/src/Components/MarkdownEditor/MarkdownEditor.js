import React, { useRef } from 'react'
import MarkdownTextArea from './TextInput/MarkdownTextArea'
import MarkdownPreview from './MarkdownPreview/MarkdownPreview'
import { AiOutlineLink } from 'react-icons/ai'
import { PiImage } from 'react-icons/pi'
import { BsTypeBold, BsTypeItalic, BsCodeSlash, BsBlockquoteLeft } from 'react-icons/bs'
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu'

export default function MarkdownEditor({markdown, setMarkdown}) {

    const textAreaRef = useRef(null)

    // Helpers
    const modifySelected = (ref,element) => {
        const textArea = ref.current
        const textBeforeSelected = textArea.value.substring(0,textArea.selectionStart)
        const selectedText = textArea.value.substring(textArea.selectionStart,textArea.selectionEnd)
        const textAfterSelected = textArea.value.substring(textArea.selectionEnd)

        return `${textBeforeSelected}${element}${selectedText}${element}${textAfterSelected}`
    }

    const insertAtCurseor = (ref, element) => {
        const textArea = ref.current
        const { selectionStart, selectionEnd } = textArea;
        
        const textBeforeCursor = textArea.value.substring(0, selectionStart) 
        const textAfterCursor = textArea.value.substring(selectionEnd, textArea.value.length)

        return `${textBeforeCursor}${element}${textAfterCursor}`
    }

    const addLink = () => {
        const newText = insertAtCurseor(textAreaRef, '[title](https://www.example.com)')
        setMarkdown(newText)
    }

    const addImage = () => {
        const newText = insertAtCurseor(textAreaRef, '![alt text](image-link)')
        setMarkdown(newText)
    }

    const addQuote = () => {
        const newText = insertAtCurseor(textAreaRef, '>')
        setMarkdown(newText)
    }

    const addCodeBlock = () => {
        const newText = insertAtCurseor(textAreaRef, '``` lang \n \n ```')
        setMarkdown(newText)
    }

    const addH1 = () => {
        const newText = insertAtCurseor(textAreaRef, '# ')
        setMarkdown(newText)
    }
    const addH2 = () => {
        const newText = insertAtCurseor(textAreaRef, '## ')
        setMarkdown(newText)
    }
    const addH3 = () => {
        const newText = insertAtCurseor(textAreaRef, '### ')
        setMarkdown(newText)
    }

    const makeBold = ()=>{
        const result = modifySelected(textAreaRef, '**')
        setMarkdown(result)
    }

    const makeItealic = () => {
        const result = modifySelected(textAreaRef, '*')
        setMarkdown(result)
    }


    return (
        <div className='editor-container'>
            <section className='markdown-tools'>
                <BsTypeBold className='markdown-tool-icon' onClick={makeBold} />
                <BsTypeItalic className='markdown-tool-icon' onClick={makeItealic} />
                <div className='markdown-tool-separator'></div>
                <LuHeading1 className='markdown-tool-icon' onClick={addH1}/>
                <LuHeading2 className='markdown-tool-icon' onClick={addH2}/>
                <LuHeading3 className='markdown-tool-icon' onClick={addH3}/>
                <div className='markdown-tool-separator'></div>
                <BsCodeSlash className='markdown-tool-icon' onClick={addCodeBlock}/>
                <BsBlockquoteLeft className='markdown-tool-icon' onClick={addQuote}/>
                <div className='markdown-tool-separator'></div>
                <AiOutlineLink className='markdown-tool-icon' onClick={addLink}/>
                <PiImage className='markdown-tool-icon' onClick={addImage}/>
            </section>
            <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} textAreaRef={textAreaRef}/>
            <MarkdownPreview markdown={markdown} />
        </div>
    )
}
