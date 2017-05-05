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
   fetch('/api/v1/folders', {
     method: 'POST',
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
     console.error('error: ', error);
   })
 };

 getFolders = () => {
   fetch('/api/v1/folders', {
     method: 'GET'
   }).then((response) => {
     return response.json()
   }).then((json) => {
     const folder = json.map((val, i) => {
      appendDropDown(val.title, val.id);
      appendFolders(val.title, val.id);
     });
   }).catch((error) => {
     console.error('error: ', error);
   });
 };

 addURL = (title, fullURL, id) => {
   fetch(`/api/v1/folders/${id}/urls`, {
     method: 'POST',
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify({
       'title': title,
       'fullURL': fullURL,
       'folder_id': id
     })
   }).then(response => response.json())
      .catch(error => console.error('error: ', error))
 }

 appendDropDown = (folders, id) => {
   const $dropDown = $('.dropdown-form');
   $dropDown.append(
     `<option class='${folders}' data-id='${id}' value='${folders}'>${folders}</option>
     `)
 };

 clearURLFields = () => {
  $('.url-form-input').val('');
  $('.title-form').val('');
  $('.dropdown-form').val('');
 };

 $('.submit').on('click', (e) => {
   e.preventDefault();
   const $urlInput = $('.url-form-input').val();
   const $title = $('.title-form').val();
   const $folderID = $('.dropdown-form :selected').data('id');
   clearURLFields();
   addURL($title, $urlInput, $folderID);
 });

 appendFolders = (folders, id) => {
   const $dropDown = $('ul');
   $dropDown.prepend(
     `<li data-id='${id}' class='folder-list-item'>${folders} <img class='arrow' src='./images/arrow.svg'></li>
     <div class='url-toggle ${id}'></div>
     `)
 };

$('ul').on('click', 'li', (e) => {
  const id = e.target.dataset.id
  getUrls(id);
});

appendURL = (urls) => {
  $('.url-toggle').empty()
  return urls.map((val, i) => {
    const date = val.created_at.slice(0, 10);
    const $urlList = $(`.${val.folder_id}`);
    $urlList.prepend(
      `<div class='links'>
      <h3 class="link-title link-info">${val.title}</h3>
      <h3 class="link-visited link-info">Visits: ${val.visited}</h3>
      <a class="link-short-url link-info" target="_blank" href="/${val.id}">${document.URL + val.id}<a>
      <p class="link-added link-info"><span class="link-date-added">Date added:</span> ${date}</p>
      </div>`)
  });
};

getUrls = (id) => {
  fetch(`/api/v1/folders/${id}/urls`, () => {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
      return appendURL(json)
  }).catch((error) => {
    console.error('error: ', error);
  });
};
