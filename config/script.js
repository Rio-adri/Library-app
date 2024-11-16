const myLibrary = [];

// Constructor function untuk membuat buku baru
function Book(title, author, page, isRead) {
    this.title = title;
    this.author = author;
    this.pages = page;
    this.isRead = isRead;
    this.info = function () {
        return `${this.isRead ? "Done" : "Not Read Yet"}`;
    };
}

function addBook(title, author, page, isRead) {
    const newBook = new Book(title, author, page, isRead);
    myLibrary.push(newBook);
}

// DOM
document.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('submit');
    const containerBook = document.getElementById('container-list');

    let isEditing = false; // Indicator for whether the user is in edit mode
    let editingIndex = -1; // Index of the book being edited

    submit.addEventListener('click', function (e) {
        e.preventDefault();

        // Get input values from the form
        const inputTitle = document.getElementById('inputTitle').value;
        const inputAuthor = document.getElementById('inputAuthor').value;
        const inputPage = document.getElementById('inputPage').value;
        const inputIsReadYes = document.getElementById('inputYes').checked;

        const isRead = inputIsReadYes; // Determine the "isRead" status based on the radio button

        if (isEditing) {
            // If in edit mode, update the book in the array
            myLibrary[editingIndex].title = inputTitle;
            myLibrary[editingIndex].author = inputAuthor;
            myLibrary[editingIndex].pages = inputPage;
            myLibrary[editingIndex].isRead = isRead;

            // Reset edit mode
            isEditing = false;
            editingIndex = -1;
        } else {
            // If not in edit mode, add a new book to the library
            addBook(inputTitle, inputAuthor, inputPage, isRead);
        }

        // Clear the form fields after submission
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputAuthor').value = '';
        document.getElementById('inputPage').value = '';
        document.getElementById('inputYes').checked = false;
        document.getElementById('inputNo').checked = false;

        // Re-render all books
        renderAllBooks();
    });

    // Function to render all books in the library
    function renderAllBooks() {
        // Clear the container before re-rendering
        containerBook.innerHTML = '';

        // Loop through the library and render each book
        for (let i = 0; i < myLibrary.length; i++) {
            renderBook(myLibrary[i], i); // Pass the book and its index
        }
    }
    // Function to render a single book
    function renderBook(book, index) {
        const div = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h4');
        const page = document.createElement('p');
        const isRead = document.createElement('p');
        const changeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const divBtn = document.createElement('div');

        // Set book details
        title.innerText = book.title;
        author.innerText = `Author: ${book.author}`;
        page.innerText = `Pages: ${book.pages}`;
        isRead.innerText = `Status: ${book.isRead ? "Done" : "Not Read Yet"}`;
        changeBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";

        // Add button container
        divBtn.setAttribute("class", "container-btn");
        divBtn.append(changeBtn, deleteBtn);

        // Set book container attributes
        div.setAttribute("class", "container-book");

        // Append elements to the book container
        div.append(title, author, page, isRead, divBtn);

        // Append the book container to the main container
        containerBook.appendChild(div);

        // Event Listener for Delete button
        deleteBtn.addEventListener("click", function () {
            myLibrary.splice(index, 1); // Remove the book from the library array
            renderAllBooks(); // Re-render all books
        });

        // Event Listener for Edit button
        changeBtn.addEventListener("click", function () {
            // Populate the form with the book's current data
            document.getElementById('inputTitle').value = book.title;
            document.getElementById('inputAuthor').value = book.author;
            document.getElementById('inputPage').value = book.pages;
            document.getElementById('inputYes').checked = book.isRead;
            document.getElementById('inputNo').checked = !book.isRead;

            // Enable edit mode and save the book's index
            isEditing = true;
            editingIndex = index;
        });
    }
});

