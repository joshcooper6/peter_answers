import { useRef, useState } from 'react';
import './App.css';
import { PROMPT, falseKeys, runTest, randomAnswer, allowedPunc, fixGrammar, allowedPrompts, lowercase, isStringIncluded } from './data.js';
import ReactTyped from 'react-typed';

function App() {
  const [displayInput, setDisplayInput] = useState('');
  const [processedInput, setProcessedInput] = useState('');
  const [cheatToggled, setCheatToggled] = useState(false);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);  
  const [descShowing, setDescShowing] = useState(false);
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
    const promptLetters = () => {
      const min = displayInput.length;
      if (min >= 0) { return PROMPT[min] };
    };

    const typePromptLetter = () => {
      setIndex((pre) => { 
        if (index === PROMPT.length) { return PROMPT.length } else { return pre + 1 }
      }); 
      setDisplayInput((prev) => prev + promptLetters());
      setProcessedInput((prev) => prev + key);
    }

    if (cheatToggled && index <= PROMPT.length - 1) {
      typePromptLetter();
    } else if (cheatToggled && index === PROMPT.length - 2 ) {
      setDisplayInput((prev) => prev + key);
    } else if (ready) {
      setDisplayInput(prev => prev);
    } else {
      setDisplayInput((prev) => prev + key);
    };
  };
  
  const toggleCheat = () => { setCheatToggled(!cheatToggled) };

  const backspaceConditions = () => {
    setIndex((pre) => { if (pre === 0) { return 0 } else { return pre - 1 } });

    const deleteLastCharac = (setState) => { setState(prev => prev.slice(0,-1)); };

    if (cheatToggled) {
      deleteLastCharac(setDisplayInput);
      deleteLastCharac(setProcessedInput);
    } else if (cheatToggled && ready) {
      setDisplayInput(prev => prev);
    } else if (ready === false) {
      deleteLastCharac(setDisplayInput);
    };
  };

  const enterConditions = () => {
    if (ready) {
      newQBtnRef.current.click();
    } else if ((ready === false && puncVisible) || (ready === false && isStringIncluded(displayInput, allowedPrompts[1]))) {
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
      case 'Control': case '^': {
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

  // const greenInput = () => {
  //   const greenIfAccurate = { color: 'green' };
  //   if (allowedPrompts.includes(displayInput)) { return greenIfAccurate };
  // };

  document.onkeydown = (e) => { handleKeyChange(e.key) }


  return (
    <div className="App full_screen flex flex_col" tabIndex={0}>

      <h1 id="title">Joshua Answers</h1>

      <div id="footer" className="flex flex_col" onClick={() => { setDescShowing(!descShowing); console.log(descShowing); }}>
        <p>
          {descShowing ? 'Hide The Hint' : 'How does this work?'} 
        </p>
      </div>

      {descShowing ? <>
        <div id="desc" className='flex flex_col typebox'>
          <h2>Press 'Control' or '^' to activate the magic.</h2>
          {cheatToggled ? <h2>Magic activated! <br /> Hide this hint and start typing.</h2> : '' }
        </div>
      </> : <>
        <div className="flex flex_col typebox">
          <h1 value={displayInput} style={greenInput()}>{displayInput.length === 0 ? <ReactTyped strings={['Start typing to ask a question...']} typeSpeed={50} /> : displayInput}</h1>
        </div>
        
        {(ready) && <>
          {processedInput.length <= 1 ? <h1 className='flex flex_col typebox'><ReactTyped strings={['Thinking...', randomAnswer()]} typeSpeed={50} /></h1> : <h1 value={processedInput} className="flex flex_col typebox"><ReactTyped strings={['Thinking...', fixGrammar(processedInput)]} typeSpeed={50} backSpeed={10} /></h1>}
        </>}

        <div id="buttonDiv" className="flex">
          {(ready === false && puncVisible) || (ready === false && isStringIncluded(displayInput, allowedPrompts[1])) ? <>
            <button ref={buttonRef} onClick={() => setReady(!ready)}>Answer The Question</button>
          </> : <>
            {displayInput.length > 0 && <button ref={newQBtnRef} onClick={restart}>New Question</button>}
          </>}
        </div>
      </>}

    </div>
  );
}

export default App;
