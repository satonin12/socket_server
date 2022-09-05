import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client'
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [inputCharacter, setInputCharacter] = useState('');
  const [inputCode, setInputCode] = useState('');
  const socketRef = useRef();
  
  const handlerKey = (e) => {
    console.log('e: ', e.keyCode);
    setInputCharacter(prevState => prevState + e.key);
    setInputCode(e.keyCode);
  }
  
  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000', {
      withCredentials: true,
    });
  }, [])
  
  useEffect(() => {
    socketRef.current.emit('typing', inputCode);
  }, [inputCharacter])
  
  return (
    <div className="App">
    
      <div className="AreaContent">
        <textarea onKeyDown={handlerKey} />
        <div className="InputLog">
          {inputCharacter}
        </div>
      </div>

    </div>
  );
}

export default App;
