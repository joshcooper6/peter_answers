export const allowedPrompts = ['Joshua, please answer the following question: ', 'Joshua, please answer', 'Joshua, please answer the following'];

export const PROMPT = allowedPrompts[0];

export const fixGrammar = (string) => {
  let firstLetter = string[0].toUpperCase();
  let substring = string.substring(1).toLowerCase();
  let period = '.';
  let newString = firstLetter + substring + period;
  return newString;
};

export const lowercase = (string) => {
  return string.toLowerCase();
};

export const isStringIncluded = (string1, string2) => {
  return lowercase(string1).includes(lowercase(string2))
};

export const falseKeys = [
    'Shift',
    'CapsLock',
    'Command',
    'Escape',
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
    `I'm sorry, could you try asking again?`,
    'I have no idea.',
    'Are you really that stupid to ask me such a question?',
    'I am confusion.',
    `You really think I'm psychic or something?`,
    `Umm... try asking again?`,
    `To be honest, I'm not quite sure.`,
    `I wish I knew the answer to that one.`
  ];

 export const randomAnswer = () => { 
    let num = Math.floor(Math.random() * answers.length);
    return answers[num];
  };

  export const allowedPunc = ['?', '.', ':', ";"]