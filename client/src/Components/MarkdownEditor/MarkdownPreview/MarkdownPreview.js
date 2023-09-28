import React from 'react'
import '../Markdown.css'

//Editor
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Syntax higlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'


export default function MarkdownPreview({ markdown }) {
  return (
    <div className='editor-preview'>
        <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                // h6({ children }) {
                //     return <Test children={children}/>
                // } 
            }}
        />
    </div>
  )
}
