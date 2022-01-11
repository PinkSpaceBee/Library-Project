'use strict';

const bookshelf = document.querySelector('#js-bookshelf');
let library = localStorage.getItem('storedLibrary') ? JSON.parse(localStorage.getItem('storedLibrary')) : [];

function Book(title, author, pagesTotal, haveRead, id) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;
    // should I made it a method?? Ok, I'll deal with it later
    this.id = id;
}

function addNewBook() {
    
    const entry = new Book(document.querySelector('#js-title').value, 
    document.querySelector('#js-author').value, 
    document.querySelector('#js-pages-total').value, 
    document.querySelector('#js-have-read').checked ? 'read' : 'not read yet',
    `id${Date.now()}`,); /* shit, I spend 20 minutes trying to figure out why the hell the id returns undefined and then I realized that I was typing it behind the closing parentheses*/ 
    
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
        //I'm so so so hungry :(

        console.log(elem.children[3]);
        console.log(library.forEach(item => console.log(item.id)));
        console.log(elem.id)
        //sets all checkboxes as checked
        //toggleBtn.checked = localStorage.getItem('toggleBtn') ? true : false;
        //localStorage.setItem('toggleBtn', 'true');
        //console.log(toggleBtn.parentElement);
        

        /*
          toggleBtn.addEventListener('click', (e) => {
              console.log(e.target.checked);
 
            if (e.target.checked) {
                localStorage.setItem('toggleBtn', 'true');
            } else {
                localStorage.removeItem('toggleBtn');
            }

            e.target.checked = localStorage.getItem('toggleBtn');

          });
        */
       toggleBtn.addEventListener('click', (e) => {
           //const haveReadProp = e.target.parentElement.children[5];
           //console.log(haveReadProp);
           if (localStorage.getItem('toggleBtn')) {
               e.checked = true;
           }
       });
    }

    function createRemoveBtn(elem) {
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'controlElems');
        removeBtn.textContent = 'x';
        elem.appendChild(removeBtn);

        removeBtn.addEventListener('click', (e) => {
            removeBookCard(e);
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

const addBookBtn = document.querySelector('#js-add-btn');
const submitBookBtn = document.querySelector('#js-submit-book-card');


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
});

showBookCard();

