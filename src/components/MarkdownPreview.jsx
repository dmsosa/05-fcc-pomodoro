function MarkdownPreview({ preview }) {
    return ( 
        <div id="preview" className="markdown-preview" dangerouslySetInnerHTML={{__html: preview}}></div>
     );
}

export default MarkdownPreview;