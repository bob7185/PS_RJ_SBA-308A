import { getReadingList, addToReadingList } from './api.mjs';

// Function to display books in a specific context (search or popular)
export function displayBooks(books, context) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p>No results found.</p>';
        return;
    }

    books.forEach(book => {
        const title = book.volumeInfo.title || 'Unknown Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const description = book.volumeInfo.description || 'No description available';
    console.log(title);
        console.log(authors)
        console.log(description)
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <strong>${title}</strong><br>
                    <em>${authors}</em><br>
                    <p>${description}</p>
                    <button id ="add-to-list" class="add-button">Add to Reading List</button>
                </div>
            </div>
        `;
        console.log(bookItem);

        // Add event listener for adding to reading list
        bookItem.querySelector('.add-button').addEventListener('click', () => {
            const book = { title, authors, description };
            addToReadingList(book);
        });

        bookList.appendChild(bookItem);
    });
}


// Function to display popular books in a carousel
export function displayCarousel(books, context, carousel_type) {
    const carousel = document.getElementById(carousel_type);
    carousel.innerHTML = ''; // Clear previous carousel items

    books.forEach(book => {
        const title = book.volumeInfo.title || 'Unknown Title';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}" />
            <h5>${title}</h5>
            <button class="add-button" data-title="${title}" data-authors="${book.volumeInfo.authors.join(', ')}" data-description="${book.volumeInfo.description}">Add to Reading List</button>
        `;

        // Add event listener for adding to reading list
        const addButton =  carouselItem.querySelector('.add-button')
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
