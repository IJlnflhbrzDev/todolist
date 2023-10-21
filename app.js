const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const filterInputTodo = document.getElementById('filter-input');
const todoList = document.getElementById('todo-list');
const clearButton = document.getElementById('clear-todos');

todoForm.addEventListener('submit', addTodo);
function addTodo(e) {
    e.preventDefault();
    console.log(todoInput.value);

    // membuat element li untuk menampung value dari todo input 
    const li = document.createElement('li');
    // Menambahkan Banyak class ke dalam li
    li.className= 'list-group-item d-flex justify-content-between align-items-center mb-1';
    // isi content li dari value todoInput mengunakan documen create textnode
    li.appendChild(document.createTextNode(todoInput.value));
    

     // membuat tombolDelete masing masing value dari li 
     const deleteList = document.createElement('a');
     deleteList.href = '#'
     deleteList.className = 'badge badge-danger';
     deleteList.textContent = 'Delete';

     // MENGABUNGKAN ELEMEN A DI DALAM LI
     li.appendChild(deleteList);

     // MENGABUNGKAN LI KEDALAM LIST GROUP 
    todoList.appendChild(li);


    // todoList.innerHTML = `
    // <li class="list-group-item d-flex justify-content-between align-items-center mb-1">
    //     ${todoInput.value}
    //     <a href="#" class="badge badge-danger">Delete</a>
    // </li>
    // `
}