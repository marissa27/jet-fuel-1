$(document).ready(() => {
  getFolders();
});

const $submitFolder = $('.submit-folder');

$submitFolder.on('click', (e) => {
  e.preventDefault();
  const $folderTitleValue = $('.folder-form').val();

  addFolders($folderTitleValue);
  clearFolderFields();
});

clearFolderFields = () => {
  const $folderTitle = $('.folder-form');
  $folderTitle.val('');
};

addFolders = (value) => {
   fetch("/api/v1/folders", {
     method: "POST",
     headers: {'Content-type': 'application/json'},
     body:
       JSON.stringify({ 'title': value })
   }).then((response) => {
     return response.json()
   }).then((json) => {
     appendDropDown(json.title);
     appendFolders(json.title);
     return json
   }).catch((error) => {
     console.log('error in addFolders');
   })
 };

 getFolders = () => {
   fetch("/api/v1/folders", {
     method: "GET"
   }).then((response) => {
     return response.json()
   }).then((json) => {
     const folder = json.map((val, i) => {
          appendDropDown(val.title);
          appendFolders(val.title);
     });
   }).catch((error) => {
     console.log('error in getFolders')
   });
 };

 appendDropDown = (folders) => {
     const $dropDown = $('.dropdown-form');
     $dropDown.append(
       `<option value="${folders}">${folders}</option>
       `
     )
 };

 appendFolders = (folders) => {
     const $dropDown = $('ul');
     $dropDown.prepend(
       `<li class="folder-list-item">${folders} <img class="arrow" src="./images/arrow.svg"></li>
       `
     )
 };
