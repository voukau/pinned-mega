let currentTabId;
let megaTabId;
let previousTab;

function createPinnedTab() {
  chrome.tabs.create(
    {
      url: "https://mega.nz/",
      pinned: true,
      active: true
    }
  )
};

function handleSearch(megaTabs) {
  if(megaTabs.length > 0) {
    megaTabId = megaTabs[0].id;
    if(megaTabId === currentTabId) {
      chrome.tabs.update(previousTab, {active: true,});
    } 
    else {
      previousTab = currentTabId;
      chrome.tabs.update(megaTabId, {active: true,});
    }
  } 
  else {
    previousTab = currentTabId;
    createPinnedTab();
  }
};

function handleClick(tab) {
  currentTabId = tab.id;
  chrome.tabs.query({url: "https://mega.nz/*"}, handleSearch);
};

chrome.browserAction.onClicked.addListener(handleClick);