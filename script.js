'use strict';

const bookshelf = document.querySelector('#js-bookshelf');
const statsSection = document.querySelector('#js-stats');
const addBookBtn = document.querySelector('#js-add-btn');
const submitBookBtn = document.querySelector('#js-submit-book-card');

let library = localStorage.getItem('storedLibrary') ? JSON.parse(localStorage.getItem('storedLibrary')) : [];

function Book(title, author, pagesTotal, haveRead, id) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;
    this.id = id;
}

function addNewBook() {
    
    const entry = new Book(document.querySelector('#js-title').value, 
    document.querySelector('#js-author').value, 
    document.querySelector('#js-pages-total').value, 
    document.querySelector('#js-have-read').checked,
    `id${Date.now()}`,); /* shit, I spent 20 minutes trying to figure out why the hell the id returns undefined, and then I realized that I was typing it behind the closing parentheses*/ 

    library.push(entry);
    localStorage.setItem('storedLibrary', JSON.stringify(library));
}

/* 
did you know that when you use the appendChild method to move a child from one parent element to another, you actually moving it, i. e. removing from one parent and moving it to another, and not just cloning it! I had no idea, wow. It's actually really neat and makes total sense! Like, if a child was cloned, which parent would it inherit from (it can't have two parents, according to the spec, poor thing)? Which parent would be referenced? What about possible duplicated IDs? What about the deep cloning? Shit, now I'm reading about the place of Event interface in the DOM hierarchy, like, I have a function to write but this stuff is just so captivating :( I'm fucking hopeless 
*/

function showBookCard() {

    function createToggleBtn(elem) {
        const toggleBtn = document.createElement('input');
        toggleBtn.setAttribute('type', 'checkbox');
        toggleBtn.setAttribute('class', 'controlElems');
        elem.appendChild(toggleBtn);

        let haveReadChecked = elem.children[3].textContent.includes('true');
        
        if (haveReadChecked) {
            toggleBtn.checked = true;
        }

       toggleBtn.addEventListener('click', (e) => {
        const currObj = library.find(obj => obj.id === elem.id);
        currObj.haveRead = !currObj.haveRead;

        localStorage.setItem('storedLibrary', JSON.stringify(library));

        haveReadChecked = e.target.checked;
        showStats(library);
       });
    }

    function createRemoveBtn(elem) {
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'controlElems');
        removeBtn.textContent = 'x';
        elem.appendChild(removeBtn);

        removeBtn.addEventListener('click', (e) => {
            removeBookCard(e);
            showStats(library);
        });

        function removeBookCard(e) {
        const objId = e.target.parentElement.id;
        const found = library.find(elem => elem.id === objId);

        library.splice(library.indexOf(found), 1);
        localStorage.setItem('storedLibrary', JSON.stringify(library));
        e.target.parentElement.remove();
        }
    }

    function addText(obj, elem) {
            for (const [key, value] of Object.entries(obj)) {
                const p = elem.appendChild(document.createElement('p'));
                p.textContent = `${key}: ${value}`;
            }
            elem.lastChild.hidden = true;
            elem.children[3].hidden = true;
            elem.setAttribute('id', elem.lastChild.textContent.slice(4));
    } 

    // add new book card    
    if (bookshelf.querySelector('article')) {
        const currArr = library.slice(-1)[0];

        const article = document.createElement('article');
        bookshelf.appendChild(article);

        addText(currArr, article);
        createRemoveBtn(article);
        createToggleBtn(article);
        showStats(library);

    // show all book cards    
    } else {
        for (const obj of Object.values(library)) {
            const article = document.createElement('article');
            bookshelf.appendChild(article);

            addText(obj, article);
            createRemoveBtn(article);
            createToggleBtn(article);
        }
    }
}

function showStats(arr) {
    const booksTotal = arr.length;
    const readBooksTotal = arr.filter(obj => obj.haveRead === true).length;
    console.log(readBooksTotal);
    const notReadTotal = booksTotal - readBooksTotal;

    const pElems = Array.from(statsSection.querySelectorAll('p'));

    pElems.forEach(p => p.children.length === 0 ? p.appendChild(document.createElement('span')) : p);

    const stats = Array.from(statsSection.querySelectorAll('span'));

    stats[0].textContent = booksTotal;
    stats[1].textContent = readBooksTotal;
    stats[2].textContent = notReadTotal;

}

addBookBtn.addEventListener('click', () => {
    // show a form to add a new book 
    document.querySelector('#js-new-book-card').style.display = 'block';
});

submitBookBtn.addEventListener('click', () => {
    addNewBook();

    const inputFields = Array.from(document.querySelector('#js-new-book-card').querySelectorAll('input'));

    // clear input fields after creating a new book card
    inputFields.forEach(i => i.value = '');
    document.querySelector('#js-have-read').checked = false;
    document.querySelector('#js-new-book-card').style.display = 'none';

    showBookCard();
    showStats(library);
});

showBookCard();
showStats(library);

