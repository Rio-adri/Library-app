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
    const changeBtn = document.getElementById("change-btn");
    const deleteBtn = document.getElementById("delete-btn");

    submit.addEventListener('click', function (e) {
        e.preventDefault();

        const inputTitle = document.getElementById('inputTitle').value;
        const inputAuthor = document.getElementById('inputAuthor').value;
        const inputPage = document.getElementById('inputPage').value;
        const inputIsReadYes = document.getElementById('inputYes').checked;
        const inputIsReadNo = document.getElementById('inputNo').checked;

        const isRead = inputIsReadYes && !inputIsReadNo;

        addBook(inputTitle, inputAuthor, inputPage, isRead);
        console.log(myLibrary);

        // Bersihkan kontainer sebelum render ulang
        containerBook.innerHTML = '';

        // Render semua buku
        for (let i = 0; i < myLibrary.length; i++) {
            renderBook(myLibrary[i]);
        }
    });

    function renderBook(book) {
        const div = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h4');
        const page = document.createElement('p');
        const isRead = document.createElement('p');
        const changeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const divBtn = document.createElement('div');

        title.innerText = book.title;
        author.innerText = `Author: ${book.author}`;
        page.innerText = `Pages: ${book.pages}`;
        isRead.innerText = `Status: ${book.isRead ? "Done" : "Not Read Yet"}`;
        changeBtn.innerText = "Change";
        deleteBtn.innerText = "Delete";


        changeBtn.setAttribute("id", "change-btn");
        deleteBtn.setAttribute("id", "delete-btn");


        divBtn.setAttribute("class", "container-btn");
        divBtn.append(changeBtn, deleteBtn);

        // Set atribut 
        div.setAttribute("class", "container-book");

        // Append elemen ke div
        div.append(title, author, page, isRead, divBtn);

        // Tambahkan div ke kontainer
        containerBook.appendChild(div);
    }

  
});
