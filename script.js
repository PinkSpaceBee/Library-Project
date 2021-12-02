const library = [];
const bookshelf = document.querySelector('#js-bookshelf');


function Book() {
    this.title = document.querySelector('#js-title').value;
    this.author = document.querySelector('#js-author').value;
    this.pagesTotal = document.querySelector('#js-pages-total').value;
    this.haveRead = document.querySelector('#js-have-read').value;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pagesTotal} pages, ${this.haveRead ? 'read' : 'not read yet'}`;
};

function addNewBook() {

    library.push(new Book(this.title, this.author, this.pagesTotal, this.haveRead));
}

function showBookCard(obj) {
    const article = bookshelf.appendChild(document.createElement('article'));

    for (const [key, value] of Object.entries(obj)) {
        const p = article.appendChild(document.createElement('p'));
        p.textContent = `${key}: ${value}`;
    }
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
