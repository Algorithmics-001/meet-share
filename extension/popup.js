var extension = document.getElementById('extension');

async function getAllRooms() {
  const response = await fetch('https://amr.sytes.net/meet', {
    method: 'GET',
  });
  console.log(response)
  return response.body;
}

function createRoom(roomName, createTime, roomURL){

  const requestBody = {
    name: roomName,
    time: createTime,
    url: roomURL
  }

  fetch('https://amr.sytes.net/meet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('POST request successful:', data);
  })
  .catch(error => {
    console.error('There was a problem with the POST request:', error);
  });
}

function newMeetRoom(){
  extension.innerHTML = '';

  var roomName = document.createElement('input');
  roomName.type = 'text';
  roomName.placeholder = 'Name';

  var roomURL = document.createElement('input');
  roomURL.type = 'text';
  roomURL.placeholder = 'URL';

  var button = document.createElement('button');
  button.innerHTML = 'Create Room';
  button.addEventListener('click', function() {
    if((roomName.value != "") && (roomURL.value != "")){
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      createRoom(roomName.value, formattedDate, roomURL.value)
    }
  });

  var goBack = document.createElement('button');
  goBack.innerHTML = '<<';
  goBack.addEventListener('click', function() {
    home()
  });

  extension.appendChild(goBack);
  extension.appendChild(roomName);
  extension.appendChild(roomURL);
  extension.appendChild(button);
}

function chatMeetList(){
  var roomList = [] 

  getAllRooms()
  .then(rooms => {
    roomList = rooms
  })
  .catch(error => {
    console.error('Error fetching rooms:', error);
  });

  extension.innerHTML = '';

  var goBack = document.createElement('button');
  goBack.innerHTML = '<<';
  goBack.addEventListener('click', function() {
    home()
  });

  extension.appendChild(goBack);

  console.log(roomList)
  roomList.forEach(function(item) {
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
