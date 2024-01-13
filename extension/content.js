chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "meet_url") {
      // Handle the received Google Meet URL
      console.log("Received Meet URL:", request.url);

      // You can further process the URL or perform additional actions here
    }
  }
);

// Check the tab URL and send a message to the popup
function checkTabURL(url) {
  if (url.includes('meet.google.com')) {
    chrome.runtime.sendMessage({ message: "meet_url", url: url });
  }
}

// Initial check when the content script is injected
checkTabURL(window.location.href);

// Listen for tab updates to detect URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    checkTabURL(changeInfo.url);
  }
});
