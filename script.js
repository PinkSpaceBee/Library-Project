const library = [];

function Book() {
    this.title = document.querySelector('#js-title').value;
    this.author = document.querySelector('#js-author').value;
    this.pagesTotal = document.querySelector('#js-pages-total').value;
    this.haveRead = document.querySelector('#js-have-read').value;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pagesTotal} pages, ${this.haveRead ? 'read' : 'not read yet'}`;
};

function test() {

    library.push(new Book(this.title, this.author, this.pagesTotal, this.haveRead));
}

const addBookBtn = document.querySelector('#js-add-btn');
const submitBookCard = document.querySelector('#js-submit-book-card');

addBookBtn.addEventListener('click', () => {
});


submitBookCard.addEventListener('click', () => {
    test();

    const inputFields = Array.from(document.querySelector('#js-new-book-card').querySelectorAll('input'));
    inputFields.forEach(i => i.type !== 'submit' ? i.value = '' : i);
    document.querySelector('#js-have-read').checked = false;
});
