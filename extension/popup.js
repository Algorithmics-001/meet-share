const nameobj = document.querySelector('#name');
const editbtn = document.querySelector(".material-symbols-outlined");
var savedName;
document.addEventListener('DOMContentLoaded', function() {
  // Load saved name from storage
  chrome.storage.sync.get(['name'], function(result) {
    savedName = result.name;
    
  });

  // Load Google Meet URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var meetUrl = getMeetUrl(currentTab.url);
    document.getElementById('meetUrl').textContent = meetUrl;
  });
});
savedName = "Ekuspreet"
// alert(savedName);




if(savedName){
  nameobj.classList.add("hiddeninput");
  nameobj.value = savedName;
  nameobj.setAttribute('readonly', 'true');

}


editbtn.addEventListener("click",()=>{
  editbtn.style.display = "None";
  nameobj.classList.remove("hiddeninput");
  nameobj.removeAttribute('readonly');
  // nameobj.setAttribute('readonly', 'false');
  
  nameobj.value = null;

})

function saveName() {
  var name = document.getElementById('name').value;
  chrome.storage.sync.set({ 'name': name }, function() {
    console.log('Name saved: ' + name);
    showNameDiv(name);
  });
}