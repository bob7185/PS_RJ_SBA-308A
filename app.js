import * as api from './api.mjs';
import * as display from './display.mjs';

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
function init() {
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
