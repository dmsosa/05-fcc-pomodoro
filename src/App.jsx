import { useState } from 'react'
import RandomQuotes from './components/RandomQuotes'

function App() {
  const [ theme, setTheme ] = useState('theme-1');
  return (
    <div id={`app-wrapper`} className={`app-wrapper ${theme}`}>
      <RandomQuotes/>
    </div>
  )
}

export default App
