var extension = document.getElementById('extension');

async function getAllRooms() {
  try {
    const response = await fetch('https://amr.sytes.net/meet', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseData = await response.json(); // Assuming response is JSON data
    console.log(responseData); // Logging the response data
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
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

function chatMeetList() {
  var roomList = [];

  getAllRooms()
    .then(rooms => {
      roomList = rooms;
      
      extension.innerHTML = '';

      var goBack = document.createElement('button');
      goBack.innerHTML = '<<';
      goBack.addEventListener('click', function() {
        home();
      });

      extension.appendChild(goBack);

      roomList.forEach(function(item) {
        console.log(item)
        var link = document.createElement('a');
        link.innerHTML = item.name;
        link.href = item.url;
        link.style.backgroundColor = '#000'; // Green background color
        link.style.border = 'none';
        link.style.color = 'white';
        link.style.padding = '8px 16px'; // Adjust padding to make the button smaller
        link.style.textAlign = 'center';
        link.style.textDecoration = 'none';
        link.style.display = 'flex'; // Set display to block
        link.style.flexWrap = 'wrap';
        link.style.fontSize = '14px'; // Adjust font size to make the button smaller
        link.style.margin = '10px 0'; // Add margin to separate buttons vertically
        link.style.cursor = 'pointer';
        link.style.borderRadius = '4px';

        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of clicking a link
            window.open(item.url);
        });
        extension.appendChild(link);
      });
    })
    .catch(error => {
      console.error('Error fetching rooms:', error);
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
