var extension = document.getElementById('extension');
var ROOM_LIST = [{"id":2,"name":"no reason","time":"2024-03-29T18:30:00.000Z","url":"meet.google.com/idk"}]

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

  var goBack = document.createElement('button');
  goBack.innerHTML = '<<';
  goBack.addEventListener('click', function() {
    home()
  });

  extension.appendChild(goBack);
  extension.appendChild(inputBox);
  extension.appendChild(button);
}

function chatMeetList(){
  extension.innerHTML = '';

  var goBack = document.createElement('button');
  goBack.innerHTML = '<<';
  goBack.addEventListener('click', function() {
    home()
  });

  extension.appendChild(goBack);

  ROOM_LIST.forEach(function(item) {
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
  NewRoom.innerHTML = "New Room"
  NewRoom.addEventListener('click', function() {
    newMeetRoom()
  })

  var AllRooms = document.createElement('button')
  AllRooms.innerHTML = "All Rooms"
  AllRooms.addEventListener('click', function() {
    chatMeetList()
  })

  extension.appendChild(NewRoom)
  extension.appendChild(AllRooms)
}

document.addEventListener('DOMContentLoaded', function() {
  home()
});
