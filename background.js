import translate from 'translate';

async function translateText(text) {
  try {
    // Set up the translate library to use a free translation service.
    translate.engine = 'libre';
    
    // Translate the selected text to a target language (e.g., Spanish)
    const translatedText = await translate(text, { to: 'es' });
    
    // Send translatedText to the content script or display it in another way.
  } catch (error) {
    console.error('Translation error:', error);
  }
}


function speakText(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }
  
chrome.runtime.onInstalled.addListener(() => {
    const context = 'selection';
  
    chrome.contextMenus.create({
      title: 'Speak',
      contexts: [context],
      id: 'speak',
    });
  
    chrome.contextMenus.create({
      title: 'Translate',
      contexts: [context],
      id: 'translate',
    });
  
    chrome.contextMenus.create({
      title: 'Cover',
      contexts: [context],
      id: 'cover',
    });
  
    chrome.contextMenus.create({
      title: 'Reveal',
      contexts: [context],
      id: 'reveal',
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'speak' || info.menuItemId === 'translate' || info.menuItemId === 'cover' || info.menuItemId === 'reveal') {
      chrome.tabs.sendMessage(tab.id, { type: 'getSelectedText' }, (response) => {
        const text = response.text;
  
        // Call appropriate function based on selected context menu item
        // For example: speakText(text), translateText(text), coverText(text), revealText(text)
      });
    }
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'speak' || info.menuItemId === 'translate' || info.menuItemId === 'cover' || info.menuItemId === 'reveal') {
      chrome.tabs.sendMessage(tab.id, { type: 'getSelectedText' }, (response) => {
        const text = response.text;
  
        if (info.menuItemId === 'speak') {
          speakText(text);
        } else if (info.menuItemId === 'translate') {
          translateText(text);
        } else if (info.menuItemId === 'cover') {
          chrome.tabs.executeScript({ code: 'coverText();' });
        } else if (info.menuItemId === 'reveal') {
          chrome.tabs.executeScript({ code: 'revealText();' });
        }
      });
    }
  });
  