const library = [];

function Book(title, author, pagesTotal, haveRead) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pagesTotal} pages, ${this.haveRead ? 'read' : 'not read yet'}`;
};


