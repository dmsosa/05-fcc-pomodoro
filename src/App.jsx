import { useEffect, useState } from 'react'
import { Calculator } from './components/Calculator';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ThemeToggler from './components/Widgets/ThemeToggler';

function App() {
  const [ theme, setTheme ] = useState('theme-1');
  useEffect(() => {
    //extract body aktuell Theme
    //es zu setzen 
    const body = document.body;
    const classList = body.classList;
    for (let i = 0; i < classList.length ; i++) {
      if (classList[i].includes('theme')) {
        classList.remove(classList[i]);
      }
    }
    classList.add(theme);
  }, [ theme ])
  return (
    <>
      <ThemeToggler theme={theme} setTheme={setTheme} />
      <Header theme={theme}/>
      <section id={'app-wrapper'} className={'app-wrapper'}>
        <Calculator/>
      </section>
      <Footer/>
    </>
  )
}

export default App
