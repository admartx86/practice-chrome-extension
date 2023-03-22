function getSelectedText() {
    return window.getSelection().toString();
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getSelectedText') {
      sendResponse({ text: getSelectedText() });
    }
  });

  function applyStyleToSelection(styleClass) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.classList.add(styleClass);
  
    try {
      range.surroundContents(span);
    } catch (error) {
      console.error('Error applying style:', error);
    }
  
    // Clear selection
    selection.removeAllRanges();
  }
  
  function coverText() {
    applyStyleToSelection('concealed-text');
  }
  
  function revealText() {
    const concealedElements = document.querySelectorAll('.concealed-text');
  
    concealedElements.forEach((el) => {
      const parent = el.parentNode;
      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
  
      parent.removeChild(el);
    });
  }
  