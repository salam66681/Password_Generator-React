import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=(){}[]";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.seSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { passwordGenerator() },
    [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div id='content-box'>
      <h1>Password Generator</h1>
      <div id='result-box'>
        <input type='text'
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef} />
        <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div id='input-box'>
        <div>
          <input type='range'
            min={6}
            max={100}
            value={length}
            onChange={(e) => { setLength(e.target.value) }} />
          <label>Length: {length}</label>
        </div>
        <div>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
