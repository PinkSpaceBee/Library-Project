'use strict';

const bookshelf = document.querySelector('#js-bookshelf');
const statsSection = document.querySelector('section');
const statsDiv = document.querySelector('#js-stats');
const addBookBtn = document.querySelector('#js-add-btn');
const submitBookBtn = document.querySelector('#js-submit-book-card');
const addBookBtnPhone = document.querySelector('#js-add-btn-phone');

let library = localStorage.getItem('storedLibrary') ? JSON.parse(localStorage.getItem('storedLibrary')) : [];

function Book(title, by, pagesTotal, haveRead, id) {
    this.Title = title;
    this.By = by;
    this["Number of pages"] = pagesTotal;
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
        const toggleBtnWrap = document.createElement('div');
        toggleBtnWrap.setAttribute('class', 'controlElems');
        elem.appendChild(toggleBtnWrap);

        const toggleBtn = document.createElement('input');
        toggleBtn.setAttribute('type', 'checkbox');
        toggleBtnWrap.appendChild(toggleBtn);

        const toggleBtnText = document.createElement('span');
        toggleBtnText.textContent = 'Mark as read';
        toggleBtnWrap.appendChild(toggleBtnText);

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
/* always removes the last item; doesn't remove the item from DOM (allegedly)*/
        const removeBtnWrap = document.createElement('div');
        removeBtnWrap.setAttribute('class', 'controlElems');
        elem.appendChild(removeBtnWrap);
    
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'controlElems');
        //removeBtn.textContent = '\u2715';
        removeBtnWrap.appendChild(removeBtn)

        removeBtnWrap.addEventListener('click', (e) => {
            removeBookCard(e);
            showStats(library);
        });

/* works correctly 
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'controlElems');
        removeBtn.textContent = '\u2715';
        elem.appendChild(removeBtn);

        removeBtn.addEventListener('click', (e) => {
            removeBookCard(e);
            showStats(library);
        });
*/
        function removeBookCard(e) {
        const objId = e.target.parentElement.parentElement.id;
        console.log(e.target);
        console.log(e.target.parentElement);
        console.log(objId);
        const found = library.find(elem => elem.id === objId);

        library.splice(library.indexOf(found), 1);
        localStorage.setItem('storedLibrary', JSON.stringify(library));
        e.target.parentElement.parentElement.remove();
        }
    }

    function addText(obj, elem) {
            for (const [key, value] of Object.entries(obj)) {
                const p = elem.appendChild(document.createElement('p'));
                p.textContent = `${key}: ${value}`;
            }
            elem.firstChild.textContent = elem.firstChild.textContent.slice(7);
            elem.lastChild.hidden = true;
            elem.children[3].hidden = true;
            elem.setAttribute('id', elem.lastChild.textContent.slice(4));
    } 

    // add a new book card to the existing ones   
    if (bookshelf.querySelector('article')) {
        const currArr = library.slice(-1)[0];

        const bookCard = document.createElement('article');
        bookshelf.appendChild(bookCard);

        addText(currArr, bookCard);
        createRemoveBtn(bookCard);
        createToggleBtn(bookCard);
        showStats(library);

    // show all book cards    
    } else {
        for (const obj of Object.values(library)) {
            const bookCard = document.createElement('article');
            bookshelf.appendChild(bookCard);

            addText(obj, bookCard);
            createRemoveBtn(bookCard);
            createToggleBtn(bookCard);
        }
    }
}

function showStats(arr) {
    const booksTotal = arr.length;
    const readBooksTotal = arr.filter(obj => obj.haveRead === true).length;
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

//console.log(addBookBtnPhone === null);

addBookBtnPhone.addEventListener('click', () => {
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

