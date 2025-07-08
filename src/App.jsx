import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RandomQuotes from './components/RandomQuotes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="app-wrapper">
      <RandomQuotes/>
    </div>
  )
}

export default App
