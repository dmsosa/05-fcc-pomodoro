import { useState } from 'react'
import { MarkdownPreviewer } from './components/MarkdownPreviewer';

function App() {
  const [ theme, setTheme ] = useState('theme-1');
  return (
    <div id={`app-wrapper`} className={`app-wrapper ${theme}`}>
      <MarkdownPreviewer />  
    </div>
  )
}

export default App
