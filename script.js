'use strict';
const library = [];
const bookshelf = document.querySelector('#js-bookshelf');

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
let removeBtn;
function showBookCard(obj) {
    const article = bookshelf.appendChild(document.createElement('article'));
    //article.appendChild(removeBtn);
    //removeBtn.textContent = 'x';
    const x = document.createElement('p');
    removeBtn = document.createElement('button');
    article.appendChild(removeBtn);
    removeBtn.textContent = 'hi';

    for (const [key, value] of Object.entries(obj)) {
        const p = article.appendChild(document.createElement('p'));
        p.textContent = `${key}: ${value}`;
    }
}

function removeBook() {

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
