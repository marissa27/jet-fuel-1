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
     appendDropDown(json.title, json.id);
     appendFolders(json.title, json.id);
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
          appendDropDown(val.title, val.id);
          appendFolders(val.title, val.id);
     });
   }).catch((error) => {
     console.log('error in getFolders')
   });
 };

 addURL = (title, fullURL, id) => {
   fetch(`/api/v1/folders/${id}/urls`, {
     method: 'POST',
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify({
       "title": title,
       "fullURL": fullURL,
       "folder_id": id
     })
   }).then(response => response.json())
      .catch(error => console.log('error in addURL'))
 }

 appendDropDown = (folders, id) => {
     const $dropDown = $('.dropdown-form');
     $dropDown.append(
       `<option class="${folders}" data-id="${id}" value="${folders}">${folders}</option>
       `
     )
 };

 $('.submit').on('click', (e) => {
   e.preventDefault();
   const $urlInput = $('.url-form-input').val();
   const $title = $('.title-form').val();
   const $folderID = $('.dropdown-form :selected').data('id');
   addURL($title, $urlInput, $folderID);
 });

 appendFolders = (folders, id) => {
     const $dropDown = $('ul');
     $dropDown.prepend(
       `<li data-id="${id}" class="folder-list-item">${folders} <img class="arrow" src="./images/arrow.svg"></li>
       <div class="url-toggle ${id}" display="none"></div>
       `
     )
 };

$('ul').on('click', 'li', (e) => {
  const id = e.target.dataset.id
  getUrls(id);
  // e.closest(`.${id}`).toggle()
});

appendURL = (obj) => {
  console.log(obj)
  const $urlList = $(`.${obj.folder_id}`);
  $urlList.prepend(
    `<div>
      <h3>${obj.title}</h3>
      <h3>${obj.visits}</h3>
      <h3>${obj.fullURL}</h3>
      <h3>${obj.shortURL}</h3>
    </div>`
  )
};

getUrls = (id) => {
  fetch(`/api/v1/folders/${id}/urls`, () => {
    method: "GET"
  }).then((response) => {
    return response.json()
  }).then((json) => {
    const urls = json.map((val, i) => {
      appendURL(val);
    })
    return urls
  }).catch((error) => {
    console.log('error in getURLS')
  });
};
