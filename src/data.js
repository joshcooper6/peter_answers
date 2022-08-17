export const PROMPT = 'Joshua, please answer the following question: '

export const fixGrammar = (string) => {
  let firstLetter = string[0].toUpperCase();
  let substring = string.substring(1).toLowerCase();
  let period = '.';
  let newString = firstLetter + substring + period;
  return newString;
};

export const falseKeys = [
    'Shift',
    'Meta',
    'Control',
    'Alt',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    'Delete'
  ];

  export const runTest = (index, cheatToggled, ready, processedInput) => {
    console.log(`Index: ${index}`)
    console.log(`Cheat Toggled: ${cheatToggled}`)
    console.log(`Ready? ${ready}`)
    console.log(`Answer: ${processedInput}`)
    console.log(`Length of Answer: ${processedInput.length}`)
  };

  export const answers = [
    'What do you mean?',
    'I have no idea.',
    'Are you really that stupid to ask me such a question?',
    'I am confusion.',
    `You really think I'm psychic or something?`,
    `Umm... try asking again?`
  ];

 export const randomAnswer = () => { 
    let num = Math.floor(Math.random() * answers.length);
    return answers[num];
  };

  export const allowedPunc = ['?', '.']