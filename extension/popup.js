var roomList = document.getElementById('roomlist');

function isGoogleMeetUrl(url) {
  return (url == "https://meet.google.com/")
}

function getAllRooms(){
  fetch('/meet', {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function newMeetRoom(){
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

function chatMeetList(){
  var data = [{"id":2,"name":"no reason","time":"2024-03-29T18:30:00.000Z","url":"meet.google.com/idk"}]

  roomList.innerHTML = '';

  data.forEach(function(item) {
    var button = document.createElement('button');
    button.innerHTML = item.name;
    button.addEventListener('click', function() {
      window.open(item.url);
    });
    roomList.appendChild(button);
  });
}

function updateUI(url) {
  if (isGoogleMeetUrl(url)) {
    newMeetRoom()
  } 
  else 
  {
    chatMeetList()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  function fetchAndUpdateUI() {
    console.log("ok")
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        updateUI(currentTab.url);
      } 
      else {
        console.log("Unable to retrieve current tab information.");
      }
    });
  }

  fetchAndUpdateUI();

  setInterval(fetchAndUpdateUI, 1000);
});
