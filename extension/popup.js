let activeTab = "";
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  activeTab = tabs[0].url;
});

var extension = document.getElementById('extension');
function isGoogleMeetUrl(url) {
  // Regular expression pattern to match Google Meet URLs
  return url.includes("meet.google.com");
}

function displayFeedback(){
  extension.append((() => { const h2Element = document.createElement('h2'); h2Element.style.color = "#39a78e"; h2Element.innerHTML = 'Link Added Successfully'; return h2Element; })());
  setTimeout(() => {
    extension.removeChild(extension.lastChild)
  }, 2000)
}


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



function createRoom(roomName, roomExp, roomURL) {

  const requestBody = {
    name: roomName,
    time: roomExp,
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
      displayFeedback();
    })
    .catch(error => {
      console.error('There was a problem with the POST request:', error);
    });
}

function newMeetRoom() {
  extension.innerHTML = '';

  var roomName = document.createElement('input');
  roomName.type = 'text';
  roomName.placeholder = 'Room Name';

  var roomURL = document.createElement('input');
  roomURL.style.display = "None"
  roomURL.value = activeTab;
  console.log(roomURL)

  var roomExp = document.createElement('input');
  roomExp.type = 'number';
  roomExp.placeholder = 'Expiry Time (in Hrs)';

  var button = document.createElement('button');
  button.innerHTML = 'Create Room';
  button.addEventListener('click', function () {
    if ((roomName.value != "") && (roomExp.value != "")) {
      createRoom(roomName.value, roomExp, roomURL.value)
     
  }});

  var goBack = document.createElement('button');
  goBack.innerHTML = 'Go Back';

  goBack.id = "backbtn"
  goBack.addEventListener('click', function () {
    extension.classList.remove("inputpage")
    home()
  });
  extension.classList.add("inputpage")
  extension.appendChild(goBack);
  extension.appendChild(roomName);
  extension.appendChild(roomURL);
  extension.appendChild(roomExp);
  extension.appendChild(button);


}

function chatMeetList() {
  var roomList = [];

  getAllRooms()
    .then(rooms => {
      roomList = rooms;

      extension.innerHTML = '';

      extension.classList.add("urlpage")


      var goBack = document.createElement('button');
      goBack.innerHTML = 'Go Back';

      goBack.id = "backbtn"
      goBack.addEventListener('click', function () {
        extension.classList.remove("urlpage")

        home();
      });

      extension.appendChild(goBack);
      var roomlist = document.createElement('div');
      roomlist.classList.add("roomlist")
      roomList.forEach(function (item) {
        console.log(item)
        var link = document.createElement('button');
        link.innerHTML = item.name;
        link.href = item.url;


        link.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default action of clicking a link
          window.open(item.url);
        });
        roomlist.appendChild(link);
      });
      console.log(roomlist)
      extension.appendChild(roomlist)
    })
    .catch(error => {
      console.error('Error fetching rooms:', error);
    });
}


function home() {
  extension.innerHTML = '';

  var NewRoom = document.createElement('button')
  if (isGoogleMeetUrl(activeTab)) {
    NewRoom.innerHTML = "New Room"

  } else {
    NewRoom.innerHTML = "Create Meet"

  }

  NewRoom.addEventListener('click', function () {
    if (isGoogleMeetUrl(activeTab)) {

      newMeetRoom()

    }
    else {

      chrome.tabs.create({ url: "https://meet.google.com/new" });
    }
  })

  var AllRooms = document.createElement('button')
  AllRooms.innerHTML = "All Rooms"
  AllRooms.addEventListener('click', function () {
    chatMeetList()
  })

  extension.appendChild(NewRoom)
  extension.appendChild(AllRooms)
}

document.addEventListener('DOMContentLoaded', function () {
  home()
});


