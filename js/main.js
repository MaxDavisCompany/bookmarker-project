//"Basically all of this consists of grabbing from local storage, changing it the way we want, and then reseting it."


// Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
  // Save Bookmark
function saveBookmark(e) {
  // console.log('it works!');

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  if(!siteName || !siteUrl) {
    alert('Please fill out form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }


  var bookmark = {
    name: siteName,
    url: siteUrl
  }

/*
// Local Storage Test
localStorage.setItem('test', 'Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/

  // Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null) {
  // Init array
  var bookmarks = [];
  // Add to array
  bookmarks.push(bookmark);
  //Set to Local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  // Get bookmakrs from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Add bookmark to array
  bookmarks.push(bookmark);
  // Re-set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//JSON.parse = turns strings back into JSON
//JSON.stringify = turns into a string

    // Clear form:
    document.getElementById('myForm').reset();

    //Re-fetch boomarks:
    fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete Bookmark Function:
  function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks:
      for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
          // Remove from array
          bookmarks.splice(i, 1);
      }
    }
    // Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks:
    fetchBookmarks();
  }

// Fetch bookmarks

function fetchBookmarks() {
  // Get bookmakrs from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output ID
  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build Output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
    '<h3>'+name+
    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
    ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> '+
    '</h3>'+
    '</div>';
  }
}

//Validate Form:
function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill out form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
