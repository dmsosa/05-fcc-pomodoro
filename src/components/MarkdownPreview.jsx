function MarkdownPreview({ state }) {
    return ( 
        <div id="preview" dangerouslySetInnerHTML={{__html: state.preview}}></div>
     );
}

export default MarkdownPreview;