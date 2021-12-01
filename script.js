function Book(title, author, pagesTotal, haveRead) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;

    this.getInfo = function() {
        return `${title} by ${author}, ${pagesTotal} pages, ${haveRead ? 'read' : 'not read yet'}`;
    }

    this.isGood = 'almost certainly';
}

const obj = {
    test: true,
}

Object.setPrototypeOf(Book, obj);


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', true);

const theMartianChronicles = {};
Object.setPrototypeOf(theMartianChronicles, Book.prototype);

const blindsight = {
    __proto__: Book,
};

const roadsidePicnic = {
    __proto__: Book.prototype,
}

const hisMartersVoice = {
    __proto__: obj,
}
