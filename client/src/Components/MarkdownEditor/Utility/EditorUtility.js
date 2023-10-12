const modifySelected = (ref, element) => {
  const textArea = ref.current;

  const textBeforeSelected = textArea.value.substring(0, textArea.selectionStart);
  const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
  const textAfterSelected = textArea.value.substring(textArea.selectionEnd);

  const cursorPosition = `${textBeforeSelected}${element}${selectedText}${element}`.length;

  return {
    newText: `${textBeforeSelected}${element}${selectedText}${element}${textAfterSelected}`,
    cursorPosition
  };
};

const insertAtCursor = (ref, element) => {
  const textArea = ref.current;
  const { selectionStart, selectionEnd } = textArea;

  const textBeforeCursor = textArea.value.substring(0, selectionStart);
  const textAfterCursor = textArea.value.substring(selectionEnd, textArea.value.length);

  const cursorPosition = `${textBeforeCursor}${element}`.length;

  return {
    newText: `${textBeforeCursor}${element}${textAfterCursor}`,
    cursorPosition
  };
};

const synchCursor = (cursorPosition, textAreaRef) => {
  setTimeout(() => {
    textAreaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    textAreaRef.current.focus();
  }, 100);
};

const addLink = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(
    textAreaRef,
    "[title](https://www.example.com)"
  );
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addImage = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, "![alt text](image-link)");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addQuote = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, ">");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addCodeBlock = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, "``` lang \n \n ```");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addH1 = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, "# ");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addH2 = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, "## ");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const addH3 = (textAreaRef, setMarkdown) => {
  const { newText, cursorPosition } = insertAtCursor(textAreaRef, "### ");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const makeBold = (textAreaRef, setMarkdown) => {
  const { cursorPosition, newText } = modifySelected(textAreaRef, "**");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

const makeItalic = (textAreaRef, setMarkdown) => {
  const { cursorPosition, newText } = modifySelected(textAreaRef, "*");
  setMarkdown(newText);
  synchCursor(cursorPosition, textAreaRef);
};

export { addCodeBlock, addH1, addH2, addH3, addImage, addLink, addQuote, makeBold, makeItalic };
