import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom'

// Usage
function App(){
  // Call hook with function to fire off  
  // after konami code is entered.
  useKonamiCode(() => {
    alert('Good job 🥳');
  });
  
  // Render whatever you like
  return (
    <div>
      Can you find the easter egg?
    </div>
  );
}

function useKonamiCode(handler) {
  // State to hold array of recently pressed keys
  const [keys, setKeys] = useState([]);

  // Convert stored keys to string and match against konami code string
  const isKonamiCode = keys.join(' ') === 'up up down down left right left right B A';

  useEffect(() => {
    let timeout;

    // When a key is pressed
    window.document.onkeydown = (e) => {
      // Update array of keys in state with new key
      setKeys((currentKeys) => [...currentKeys, getKeyName(e.keyCode)] as any);
      
      // Clear 5s timeout since key was just pressed
      clearTimeout(timeout);

      // Reset keys if 5s passes so user can try again
      timeout = setTimeout(() => setKeys([]), 5000);
    };
  }, []);

  // Once konami code is entered call handler function
  // and reset keys so user can do it again.
  useEffect(() => {
    if (isKonamiCode) {
      handler();
      setKeys([]);
    }
  }, [isKonamiCode, handler]);

  return isKonamiCode;
}

const getKeyName = (keyCode: number) => {
  return {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    66: 'B',
  }[keyCode];
};

// Usage
function App1(){
  const [isOn, toggleIsOn] = useToggle();
  
  return (
    <button onClick={toggleIsOn}>
      Turn  {isOn ? 'Off' : 'On'}
    </button>
  );
}

// Hook
function useToggle(initialValue = false){
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  return useReducer((state) => !state, initialValue);
}

ReactDOM.render(<App />, document.getElementById('root'))