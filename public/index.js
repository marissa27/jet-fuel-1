$(document).ready(() => {
  getFolders();
});

const $submitFolder = $('.submit-folder');

$submitFolder.on('click', (e) => {
  e.preventDefault();
  const $folderTitle = $('.folder-form').val()
  addFolders($folderTitle)
});

addFolders = (value) => {
   fetch("/api/folders", {
     method: "POST",
     headers: {'Content-type': 'application/json'},
     body:
       JSON.stringify({ 'title': value })
   }).then((response) => {
     return response
   }).then((response) => {
     getFolders();
   }).catch((error) => {
     console.log('error in addFolders');
   })
 }

 getFolders = () => {
   fetch("/api/folders", {
     method: "GET"
   }).then((response) => {
     return response.json()
   }).then((json) => {
     appendDropDown(json.folders);
     appendFolders(json.folders);
   }).catch((error) => {
     console.log('error in getFolders')
   })
 }

 appendDropDown = (folders) => {
   const folder = Object.keys(folders)
   folder.map((key) => {
     console.log(folders[key]);
     const $dropDown = $('.dropdown-form');
     $dropDown.append(
       `<option value="${folders[key]}">${folders[key]}</option>
       `
     )
   })
 }

 appendFolders = (folders) => {
   const folder = Object.keys(folders)
   folder.map((key) => {
     console.log(folders[key]);
     const $dropDown = $('ul');
     $dropDown.prepend(
       `<li class="folder-list-item">${folders[key]} <img class="arrow" src="./images/arrow.svg"></li>
       `
     )
   })
 }
