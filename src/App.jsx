import { useState } from 'react'
import { initialText } from './markdown';
import { marked } from 'marked';
import { FaFreeCodeCamp } from 'react-icons/fa';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import MarkdownInput from './components/MarkdownInput';
import MarkdownPreview from './components/MarkdownPreview';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [ theme, setTheme ] = useState('theme-1');
  const [ markdownState, setMarkdownState ] = useState(
    { 
      input: initialText, 
      preview: marked(initialText),
      inputFullscreen: false,
      previewFullscreen: false,
    });

  const { inputFullscreen, previewFullscreen } = markdownState;

  const toggleTheme = () => {
    const randIndex = getRandomInt(1, 5);
    setTheme(`theme-${randIndex}`)
  };

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
  return (
    <div id={`app-wrapper`} className={`${theme} grid-container`}>
        <div className="grid-item">
          <div className={`box ${inputFullscreen ? 'box-fullscreen':''}`}>
            <div className="box-header">
              <FaFreeCodeCamp className='logo' />
              { inputFullscreen ? <MdFullscreenExit role='button' onClick={() => {
                toggleFullscreen('input');
              }} /> : 
              <MdFullscreen role='button' onClick={() => {
                toggleFullscreen('input');
              }} />} 
            </div>
            <div className="p3">
              <MarkdownInput state={markdownState} setState={setMarkdownState} />
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className={`box ${previewFullscreen ? 'box-fullscreen':''}`}>
            <div className="box-header">
              <FaFreeCodeCamp className='logo' />
              { previewFullscreen ? <MdFullscreenExit role='button' onClick={() => {
                toggleFullscreen('preview');
              }} /> : 
              <MdFullscreen role='button' onClick={() => {
                toggleFullscreen('preview');
              }} />}            </div>
            <div className="p3">
                <MarkdownPreview preview={markdownState.preview} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
