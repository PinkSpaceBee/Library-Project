'use strict';

const library = [];
const bookshelf = document.querySelector('#js-bookshelf');
let removeBtn;

function Book(title, author, pagesTotal, haveRead) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;
}

function addNewBook() {
    library.push(new Book(document.querySelector('#js-title').value, 
    document.querySelector('#js-author').value, 
    document.querySelector('#js-pages-total').value, 
    document.querySelector('#js-have-read').checked ? 'read' : 'not read yet'));
}
let article;
function showBookCard(obj) {
    article = bookshelf.appendChild(document.createElement('article'));

    removeBtn = document.createElement('button');
    article.appendChild(removeBtn);
    removeBtn.textContent = 'x';

    for (const [key, value] of Object.entries(obj)) {
        const p = article.appendChild(document.createElement('p'));
        p.textContent = `${key}: ${value}`;
    }

    // it doesn't remove the element from an array
    removeBtn.addEventListener('click', () => {
        bookshelf.removeChild(article);
    })
}

function removeBookCard() {
    
}

const addBookBtn = document.querySelector('#js-add-btn');
const submitBookCard = document.querySelector('#js-submit-book-card');

addBookBtn.addEventListener('click', () => {
    // show a form to add a new book 
    document.querySelector('#js-new-book-card').style.display = 'block';
});

submitBookCard.addEventListener('click', () => {
    addNewBook();

    const inputFields = Array.from(document.querySelector('#js-new-book-card').querySelectorAll('input'));
    //I'm not removing the last element's value because it's a submit button. 
    //Maybe I should've made it a button? 
    inputFields.forEach(i => i.type !== 'submit' ? i.value = '' : i);
    document.querySelector('#js-have-read').checked = false;
    document.querySelector('#js-new-book-card').style.display = 'none';

    showBookCard(library[library.length-1]);
});

