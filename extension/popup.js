function saveName() {
  // alert("first alert");
  chrome.storage.local.set({ 'name': "Amr" }, function() {
    alert("second alert");
    console.log('Name saved: Amr');  // Note: Use the actual value 'Amr' here, as 'name' is not defined in this scope
    alert("name saved");
  });
}

saveName();
const nameobj = document.querySelector('#name');
const editbtn = document.querySelector("#editname");
var savedName;
document.addEventListener('DOMContentLoaded', function() {
  // Load saved name from storage
  chrome.storage.sync.get(['name'], function(result) {
    savedName = result.name;
    alert(savedName);
  });

  // Load Google Meet URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var meetUrl = getMeetUrl(currentTab.url);
    document.getElementById('meetUrl').textContent = meetUrl;
  });
});
// savedName = "Ekuspreet"
// alert(savedName);



if(savedName){
  nameobj.classList.add("hiddeninput");
  nameobj.value = savedName;
  nameobj.setAttribute('readonly', 'true');
  editbtn.style.display = "block";

}


editbtn.addEventListener("click",()=>{
  editbtn.style.display = "None";
  nameobj.classList.remove("hiddeninput");
  nameobj.removeAttribute('readonly');
  // nameobj.setAttribute('readonly', 'false');
  
  nameobj.value = null;

})
nameobj.addEventListener('keyup', function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
      // Perform your desired action here
      var newName = nameobj.value;
  nameobj.classList.add("hiddeninput");
  nameobj.setAttribute('readonly', 'true');
  editbtn.style.display = "block";
  }
});
