var roomList = document.getElementById('roomlist');

function isGoogleMeetUrl(url) {
  // Regular expression pattern to match Google Meet URLs
  var meetUrlPattern = /^https:\/\/meet\.google\.com\/\w+$/;
  return meetUrlPattern.test(url);
}

function updateUI(url) {
  if (isGoogleMeetUrl(url)) {

    var inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Enter room name';

    var button = document.createElement('button');
    button.innerHTML = 'Create Room';
    button.addEventListener('click', function() {
      var roomName = inputBox.value;
      console.log("Joining room:", roomName);
    });

    roomList.innerHTML = '';
    roomList.appendChild(inputBox);
    roomList.appendChild(button);
  } 
  
  else {
  
    var data = [
      { url: "https://example.com", name: "Button X" },
      { url: "https://example.org", name: "Button 2" },
      { url: "https://example.net", name: "Button 3" }
    ];

    roomList.innerHTML = '';

    data.forEach(function(item) {
      var button = document.createElement('button');
      button.innerHTML = item.name;
      button.addEventListener('click', function() {
        // Handle button click event here
        // For example, you can open the URL associated with the button
        window.open(item.url);
      });
      roomList.appendChild(button);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    if (currentTab && currentTab.url) {
      updateUI(currentTab.url);
    } 
    else {
      console.log("Unable to retrieve current tab information.");
    }
  });
});

// Listen for tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab && tab.url) {
      updateUI(tab.url);
    } else {
      console.log("Unable to retrieve current tab information.");
    }
  });
});
