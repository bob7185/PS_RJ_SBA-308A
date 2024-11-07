import { displayReadingList} from "./display.mjs";



const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Function to search for books
export async function searchBooks(query) {
    try {
        const response = await axios.get(`${API_URL}?q=${query}&maxResults=5`);
        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// Function to get the 5 most popular books by category
export async function getPopularBooks(category) {
    try {
        const response = await axios.get(`${API_URL}?q=subject:${category}&maxResults=5`);
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching popular ${category} books:`, error);
        return [];
    }
}

// Function to add a book to the reading list
export function addToReadingList(book) {
    // 
    const readingList = getReadingList();
    readingList.push(book);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    displayReadingList();
}

// Function to retrieve the reading list from local storage
export function getReadingList() {
    return JSON.parse(localStorage.getItem('readingList')) || [];
}

// Function to remove a book from the reading list
export function removeBookFromReadingList(title) {
    const readingList = getReadingList();
    const updatedList = readingList.filter(book => book.title !== title);
    localStorage.setItem('readingList', JSON.stringify(updatedList));
}
