import React from 'react'
import '../Markdown.css'

export default function MarkdownTextArea({setMarkdown, markdown}) {
  return (
    <textarea onChange={(e) => setMarkdown(e.currentTarget.value)} value={markdown}></textarea>
  )
}
