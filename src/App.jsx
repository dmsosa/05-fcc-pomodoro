import { useState } from 'react'
import { initialText } from './markdown';
import { marked } from 'marked';
import { FaFreeCodeCamp } from 'react-icons/fa';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';


function App() {
  const [ markdownState, setMarkdownState ] = useState(
    { 
      editor: initialText, 
      preview: marked(initialText),
      inputFullscreen: false,
      previewFullscreen: false,
    });

  const { editor, preview, inputFullscreen, previewFullscreen } = markdownState;

  const handleInputChange = (e) => {
    const value = e.currentTarget.value;
    setState((prev) =>( {...prev, input: value, preview: marked(value)}));
  }


  const toggleFullscreen = (target) => {
    if (target === 'input') {
      setMarkdownState(prevState => ({
        ...prevState,
        inputFullscreen: !inputFullscreen,
        previewFullscreen: false
      }));
    } else if (target === 'preview') {
      setMarkdownState(prevState => ({
        ...prevState,
        inputFullscreen: false,
        previewFullscreen: !previewFullscreen
      }));
    }
  };
  
  const onMouseDown = (e) => {
    e.preventDefault();
    const handler = e.currentTarget;
    const grid = document.querySelector('.grid');
    if (!grid) return;
    const target = handler.dataset.target;
    
    const startDrag = (event) => {
      if (target === 'row') {
        const topPos = Math.round((event.clientY * 100) / window.innerHeight);
        const botPos = 100 - topPos;
        grid.style.gridTemplateRows = `minmax(25%, ${topPos}%) minmax(25%, ${botPos}%)`;
        handler.style.top = `min(75%, (max(25%, ${topPos}%)))`;
        console.log(topPos)
      } else if (target === 'col') {
        const leftPos = Math.round((event.clientY * 100) / window.innerHeight);
        const rightPos = 100 - topPos;
        grid.style.gridTemplateRows = `minmax(25%, ${leftPos}%) minmax(25%, ${rightPos}%)`;
        handler.style.top = `min(75%, (max(25%, ${leftPos}%)))`;
      }
    }
    const stopDrag = () => {
      document.removeEventListener('mousemove', startDrag);
      document.removeEventListener('mouseup', stopDrag);
    }
      document.addEventListener('mousemove', startDrag);
      document.addEventListener('mouseup', stopDrag);
    } 
  return (
    <div id="app-wrapper" className="app-wrapper">
      <div className="grid">
        <div className={`grid-item border border-primary border-width-0 ${inputFullscreen ? 'fullscreen':''}`}>
            <div className="box-header">
              <FaFreeCodeCamp className='logo' />
              <button className="btn" onClick={() => {
                toggleFullscreen('input');
              }}>
                { inputFullscreen ? <MdFullscreenExit/> : <MdFullscreen /> }
              </button>
            </div>
            <div className="box-content">
              <textarea id="editor" className='editor' onChange={handleInputChange} value={editor} ></textarea>
            </div>
        </div>
        <div className={`grid-item border border-primary border-width-0 ${previewFullscreen ? 'fullscreen':''}`}>
            <div className="box-header">
              <FaFreeCodeCamp className='logo' />
              <button className="btn" onClick={() => {
                toggleFullscreen('preview');
              }}>
                { previewFullscreen ? <MdFullscreenExit/> : <MdFullscreen /> }
              </button>          </div>
            <div className="box-content p-2">
                <div id="preview" dangerouslySetInnerHTML={{__html: preview}}></div>
            </div>
        </div>
        <a href="" className="handler handler-row" 
        onClick={(e) => { e.preventDefault() }}
        onMouseDown={onMouseDown}
        data-target="row"
        ></a>
        <a href="" className="handler handler-col" 
        onClick={(e) => { e.preventDefault() }}
        onMouseDown={onMouseDown}
        data-target="col"
        ></a>
      </div>

    </div>
  )
}

export default App
