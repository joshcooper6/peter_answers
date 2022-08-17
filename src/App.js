import { useRef, useState } from 'react';
import './App.css';
import { PROMPT, falseKeys, runTest, randomAnswer, allowedPunc, fixGrammar } from './data.js';

function App() {

  const [displayInput, setDisplayInput] = useState('');
  const [processedInput, setProcessedInput] = useState('');
  const [cheatToggled, setCheatToggled] = useState(false);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const buttonRef = useRef('');
  const newQBtnRef = useRef('');

  const lastCharac = (displayInput[displayInput.length - 1]);
  const puncVisible = allowedPunc.includes(lastCharac);

  const restart = (e) => {
    let button = e.target;
    button.blur();
    setDisplayInput('');
    setProcessedInput('');
    setCheatToggled(false);
    setIndex(0);
    setReady(false);
  };

  const cheat = (key) => {
    const returnLetters = () => {
      const min = displayInput.length;

      if (min >= 0) {
        return PROMPT[min]
      };
    };

    const showFakePrompt = () => {
      setIndex((pre) => {
        if (index === PROMPT.length) {
          return PROMPT.length
        } else {
          return pre + 1
        }
      });
      setDisplayInput((prev) => prev + returnLetters());
      setProcessedInput((prev) => prev + key);
    }

    if (cheatToggled && index <= PROMPT.length - 1) {
      showFakePrompt();
    } else if (cheatToggled && index === PROMPT.length - 2) {
      setDisplayInput((prev) => prev + key);
    } else {
      setDisplayInput((prev) => prev + key);
    };
  };
  
  const toggleCheat = () => { setCheatToggled(!cheatToggled) };

  const backspaceConditions = () => {

    setIndex((pre) => {
      if (pre === 0) {
        return 0
      } else {
        return pre - 1
      }
    });

    const deleteLastCharac = (setState) => {
      setState(prev => prev.slice(0,-1));
    };

    if (cheatToggled) {
      deleteLastCharac(setDisplayInput);
      deleteLastCharac(setProcessedInput);
    } else {
      deleteLastCharac(setDisplayInput);
    };

  };

  const enterConditions = () => {
    if (ready) {
      newQBtnRef.current.click();
    } else if (ready === false && puncVisible) {
      buttonRef.current.click();
    } else {
      newQBtnRef.current.click();
    };
  };

  const handleKeyChange = (key) => {
    switch (key) {
      case 'Backspace':
        backspaceConditions();
        break;
      case 'Enter': {
        enterConditions();
        break;
      }
      case 'Control': {
        toggleCheat();
        break;
      }
      default: {
        if (falseKeys.includes(key)) {
          return false;
        } else {
          cheat(key);
        }
      }
    }
  }

  runTest(index, cheatToggled, ready, processedInput);

  const greenInput = () => {
    const greenIfAccurate = { color: 'green' };
    const allowedPrompts = [PROMPT, 'Joshua, please answer'];
    if (allowedPrompts.includes(displayInput)) { return greenIfAccurate };
  };

  document.onkeydown = (e) => { handleKeyChange(e.key) }

  return (
    <div className="App full_screen flex flex_col no_select" tabIndex={0}>

      <h1 value={displayInput} style={greenInput()}>{displayInput}</h1>
      
      {ready === false && puncVisible && <>
        <button ref={buttonRef} onClick={() => setReady(!ready)}>Answer The Question</button>
      </>}

      {ready && <>
        {processedInput.length <= 1 ? <h1>{randomAnswer()}</h1> : <h1 value={processedInput}>{fixGrammar(processedInput)}</h1>}
      </>}

      <button ref={newQBtnRef} onClick={restart}>New Question</button>

    </div>
  );
}

export default App;
