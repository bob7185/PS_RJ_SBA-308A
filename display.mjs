import { getReadingList, addToReadingList } from './api.mjs';

// Function to display books in a carousel
export function displayCarousel(books, carousel_type) {
    // in case of a search check if they were no search results 
    if (carousel_type === "search-carousel") {
        const bookList = document.getElementById('search-carousel');
        bookList.innerHTML = '';
        if (books.length === 0) {
            bookList.innerHTML = '<p>No results found.</p>';
            return;
        }
    }
    const carousel = document.getElementById(carousel_type);
    carousel.innerHTML = ''; // Clear previous carousel items
    books.forEach(book => {
        const title = book.volumeInfo.title || 'Unknown Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const description = book.volumeInfo.description || 'No description available';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        const carouselItem = document.createElement('div');
        if (carousel_type === "category-carousel") {
            carouselItem.className = 'popularbook-item';
            carouselItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}" />
            <h5>${title}</h5>
            <em>${authors}</em><br>
            <button class="add-button">Add to Reading List</button>
        `;
        }
        else if (carousel_type === "search-carousel") {
            carouselItem.className = 'bookresult-item';
            carouselItem.innerHTML = `
                    <strong>${title}</strong><br>
                    <em>${authors}</em><br>
                    <img src="${thumbnail}" alt="${title}" />
                    <p>${description}</p>
                    <button  
                    class="add-button">Add to Reading List</button>
            `
        }
        // Add event listener for adding to reading list
        const addButton = carouselItem.querySelector('.add-button')
        addButton.addEventListener('click', () => {
            const book_data = {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors.join(', '),
                description: book.volumeInfo.description,
            };
            addToReadingList(book_data);
        });
        carousel.appendChild(carouselItem);
    });
}

// Function to display the user's reading list
export function displayReadingList() {
    const readingList = getReadingList();
    const readingListContainer = document.getElementById('reading-list');
    readingListContainer.innerHTML = ''; // Clear previous items
    if (readingList.length === 0) {
        readingListContainer.innerHTML = '<p>No books in your reading list.</p>';
        return;
    }
    readingList.forEach(book => {
        const readingListItem = document.createElement('div');
        readingListItem.className = 'reading-list-item';
        readingListItem.innerHTML = `
            <strong>${book.title}</strong>
            <button class="remove-button" data-title="${book.title}">Remove</button>
        `;
        readingListContainer.appendChild(readingListItem);
    });
}
