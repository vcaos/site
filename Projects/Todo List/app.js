// adding a todo
const addForm = document.querySelector('.add');
const list = document.querySelector('.todo-list');
addForm.addEventListener('submit', e => {
    // prevent page from refreshing
    e.preventDefault();

    // get the new todo that we will be adding to the list
    const todo = addForm.add.value.trim(); 

    // insert todo into the list-item template
    let html = `
    <li class="list-item">
        <span>${todo}</span>
        <img class="delete" src="delete.png">
    </li>
    `;

    // if non-empty todo, append todo to the list
    if (todo.length) {
        list.innerHTML += html; 
    }

    // after submitting, clear the input field
    addForm.reset();
});

// deleting a todo
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

// function to filter search bar
const filterTodos = term => {
    // list.children is an HTMLCollection --> convert it into an aray
    Array.from(list.children)
        .filter((todo) => {
            // return the items that do NOT include the term
            // so that we can give it a class of d-none (display: none)
            return !todo.textContent.includes(term);
        })
        .forEach((todo) => {
            todo.classList.add('d-none');
        });

    Array.from(list.children)
        .filter((todo) => {
            // return the items that do include the term
            // so that we can remove the class of d-none
            return todo.textContent.includes(term);
        })
        .forEach((todo) => {
            todo.classList.remove('d-none');
        });
};

// searching an item
const searchForm = document.querySelector('.search');
searchForm.addEventListener('keyup', e => {
    const term = searchForm.search.value.trim();
    filterTodos(term);

    
});
