
const myLibrary = [];

// constructor function untuk membuat buku baru 
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `${this.isRead === true ? "Done" : "Not Read Yet"}`;
    }
}

function addBook (title,author,pages,isRead) {
    const newBook = new Book(title,author,pages,isRead);
    myLibrary.push(newBook);
}

// DOM
document.addEventListener('DOMContentLoaded' ,function () {
    const submit = document.getElementById('submit');

    submit.addEventListener('click', function (e) {
        e.preventDefault();

        const inputTitle = document.getElementById('inputTitle').value;
        const inputAuthor = document.getElementById('inputAuthor').value;
        const inputPage = document.getElementById('inputPage').value;
        const inputIsReadYes = document.getElementById('inputYes').checked;
        const inputIsReadNo = document.getElementById('inputNo').checked;

        let isRead = false;

        if(inputIsReadYes == true && inputIsReadNo == false) {
            isRead = true;
        } else{
            isRead = false;
        }

        addBook(inputTitle, inputAuthor, inputPage, isRead);

    });

    function renderBook () {
        
    }
    

})