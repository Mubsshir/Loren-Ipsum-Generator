import { useRef, useState } from 'react';
import text from './data';
import './App.css';
import { useEffect } from 'react';
const App = () => {
  const [count, setCount] = useState(0);
  const [copy, setCopy] = useState(false);
  const number = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    let paraCount = number.current.value;
    if (paraCount > 8) {
      setCount(count);
      return;
    }
    setCount(paraCount);
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setCopy(false);
    }, 3000);
    return () => { clearTimeout(timer) }
  }, [copy])
  const copyToBoard = (e) => {
    setCopy(true)
    let textToCopy = e.target.innerText;
    navigator.clipboard.writeText(textToCopy);
  }
  return (
    <main className="App">
      <h3 className='heading'>TIRED OF BORING LOREM IPSUM?</h3>
      <div>
        <form className='form' onSubmit={submitHandler}>
          <label htmlFor="num">Paragraphs</label>
          <input ref={number} type="number" min={0} max={99} placeholder='0' id="num" />
          <button type="submit">Generate</button>
        </form>
      </div>
      {copy && <p className='copy'>Copied To Clipbord</p>}
      {text.map((content, index) => {
        if (index < count) {
          return (<p onClick={copyToBoard} className={`para`} key={index} > {content}</p>)
        }
        return "";
      })}
    </main >
  );
}

export default App;
