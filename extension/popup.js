var extension = document.getElementById('extension');

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
  extension.innerHTML = '';

  var inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.placeholder = 'Enter room name';

  var button = document.createElement('button');
  button.innerHTML = 'Create Room';
  button.addEventListener('click', function() {
    var roomName = inputBox.value;
    console.log("Joining room:", roomName);
  });

  extension.appendChild(inputBox);
  extension.appendChild(button);
}

function chatMeetList(){
  extension.innerHTML = '';

  data.forEach(function(item) {
    var button = document.createElement('button');
    button.innerHTML = item.name;
    button.addEventListener('click', function() {
      window.open(item.url);
    });
    extension.appendChild(button);
  });
}

function home(){
  extension.innerHTML='';

  var NewRoom = document.createElement('button')
  NewRoom.innerHTML("New Room")
  NewRoom.addEventListener('click', function() {
    newMeetRoom()
  })

  var AllRooms = document.createElement('button')
  AllRooms.innerHTML("")
  AllRooms.addEventListener('click', function() {
    chatMeetList()
  })

  extension.appendChild(NewRoom)
  extension.appendChild(AllRooms)
}

document.addEventListener('DOMContentLoaded', function() {
  home()
});
