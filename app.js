/*The google book API does support posting data,for authenticated users. 
HGoogle changed their authentication method for these APIS requirng an authentication token. 
I did follow all the steps in their documentation but I am having issues getting that acccess token to implement the POST feature.  
I kept running into this issue: XHRGET
https://accounts.google.com/gsi/status?client_id=747880236837-cijrhqqclc94clbpqhlb7e5otgvt1ipu.apps.googleusercontent.com&as=8iorklF9CgPoPrrwsCMJcw
[HTTP/2 403  47ms]
[GSI_LOGGER]: The given origin is not allowed for the given client ID. client:71:273
GET http://127.0.0.1:3000/favicon.ico
[HTTP/1.1 404 Not Found 0ms]
I tried adding the localhost to the list of authorized javascript in google console but it is still not working. 

So i implemented the feature using local storage instead.  instead of reuisng a different API
​ */




import * as api from './api.mjs';
import * as display from './display.mjs';

function initGoogleAuth() {
    google.accounts.id.initialize({
        client_id: '747880236837-cijrhqqclc94clbpqhlb7e5otgvt1ipu.apps.googleusercontent.com', // Replace with your Client ID
        callback: handleCredentialResponse
    });

    // Automatically check if the user is already signed in when the page loads
    google.accounts.id.renderButton(
        document.getElementById("sign-in-button"),
        { theme: "outline", size: "large" } // Optional button customization
    );

    // Prompt for sign-in if the user isn't logged in
    google.accounts.id.prompt();
}

// This function will be called once the user is authenticated
function handleCredentialResponse(response) {
    console.log("Signed in successfully.");
    console.log('ID Token:', response.credential); // Logs the OAuth 2.0 ID Token

    // You can send this token to your server for further authentication/authorization
}




// Function to handle searching for books
function handleSearch() {
    const query = document.getElementById('search-input').value;
    api.searchBooks(query).then(books => {
        display.displayCarousel(books, 'search-carousel');
    });
}

// Function to handle category selection
function handleCategoryChange() {
    const category = document.getElementById('category-select').value;
    api.getPopularBooks(category).then(books => {
        display.displayCarousel(books,  'category-carousel');
        display.displayCarousel(books,  'category-carousel');
    });
}


// Function to remove a book from the reading list
function removeFromReadingListHandler(title) {
    api.removeBookFromReadingList(title);
    display.displayReadingList();
}

// Initialize the application
async function init() {

    initGoogleAuth();
    // Setup category selection
    const categorySelect = document.getElementById('category-select');
    categorySelect.addEventListener('change', handleCategoryChange);

    // Fetch and display initial popular books
    handleCategoryChange();

    // Display the initial reading list
    display.displayReadingList();

    // Event listener for the search button
    document.getElementById('search-button').addEventListener('click', handleSearch);

    // addd event listener to the reading list to remove a book from the list
    const readingList = document.getElementById('reading-list');
    readingList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-button')) {
            const title = event.target.getAttribute('data-title');
            removeFromReadingListHandler(title);
        }
    });
}

// Start app
init();
