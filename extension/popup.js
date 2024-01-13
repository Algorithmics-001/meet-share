document.addEventListener('DOMContentLoaded', function() {
  // Load saved name from storage
  chrome.storage.sync.get(['name'], function(result) {
    var savedName = result.name;
    if (savedName) {
      showNameDiv(savedName);
    }
  });

  // Load Google Meet URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var meetUrl = getMeetUrl(currentTab.url);
    document.getElementById('meetUrl').textContent = meetUrl;
  });
});

// Save name to storage and show the name div
function saveName() {
  var name = document.getElementById('name').value;
  chrome.storage.sync.set({ 'name': name }, function() {
    console.log('Name saved: ' + name);
    showNameDiv(name);
  });
}

// Show the name div with the given name
function showNameDiv(name) {
  document.getElementById('nameInputDiv').style.display = 'none';
  document.getElementById('nameDiv').style.display = 'block';
  document.getElementById('savedName').textContent = 'Your Name: ' + name;
}

// Update name button handler
function updateName() {
  document.getElementById('nameInputDiv').style.display = 'block';
  document.getElementById('nameDiv').style.display = 'none';
}
