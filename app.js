const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterInputTodo = document.getElementById('filter-input');
const clearButton = document.getElementById('clear-todos');

immediateLoadEventListener();
// membuat function untuk memangil semua event listener
function immediateLoadEventListener() {
    // mendapatkan todos dari localeStorage dan render di brouwser
    document.addEventListener('DOMContentLoaded', getTodos);
    // Membuat event submit pada form ketika ada user submit button
    todoForm.addEventListener('submit', addTodo);
    // membuat event click pada list todo yg dibuat oleh user ketika user klik tombol delete
    todoList.addEventListener("click", deleteTodo);
    // membuar event clisc untuk menghapus semua todolis sekaligus
    clearButton.addEventListener('click', clearTodos);
    // Membuat event filter todolist atau pencarian todolist
    filterInputTodo.addEventListener('keyup', filterTodos);
}


function createTodoElement(value) {
      // membuat element li untuk menampung value dari todo input 
      const li = document.createElement('li');
      // Menambahkan Banyak class ke dalam li
      li.className = 'todo-item list-group-item d-flex justify-content-between align-items-center mb-1';
      // isi content li dari value todoInput mengunakan documen create textnode
      li.appendChild(document.createTextNode(value));


      // membuat tombolDelete masing masing value dari li 
      const deleteList = document.createElement('a');
      deleteList.href = '#'
      deleteList.className = 'badge badge-danger delete-todo';
      deleteList.textContent = 'Delete';

      // MENGABUNGKAN ELEMEN A DI DALAM LI
      li.appendChild(deleteList);

      // MENGABUNGKAN LI KEDALAM LIST GROUP 
      todoList.appendChild(li);
}
function getItemFromLocalStorage() {
    let todos; 
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function getTodos() {
   const todos = getItemFromLocalStorage();
    // loop data yg di tambahkan user ke localstorage 
    todos.forEach((todo) => {
      createTodoElement(todo);
    });
}

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {
        createTodoElement(todoInput.value);
        // memangil function untuk set data per masing masing todolist ke localeStorage
        addTodoToLocaleStorage(todoInput.value);

        // menghapus inputan user ketika list sudah di tambahkan 
        todoInput.value = '';

    } else {
        alert('todolist gaboleh kosong!!')
    }

}

// membuat function untuk masukan data todolist ke localeStorage
function addTodoToLocaleStorage(todoInputValue) {
    const todos = getItemFromLocalStorage();

    // push setiap todos yg di buat user ke variabel todos 
    todos.push(todoInputValue);

    // setelah push ke variabel todos 
    // maka set ke localeStorage, dan jangan lupa data localeStorage harus strng 
    // maka dari itu convert terlebih dahulu datanya dari array ke string
    localStorage.setItem('todos', JSON.stringify(todos));

}

function deleteTodo(e) {
    e.preventDefault();

    // Membuat logic untuk mencari class delete-todo
    if (e.target.classList.contains('delete-todo')) {
        // membuat condisi untuk meyakinkan user mau di hapus beneran ga list nya
        if (confirm('Apakah yakin mau menghapus?')) {
            // setiap target yg dklik remove parent element nya
            const parent = e.target.parentElement;
            parent.remove();
            deleteTodoFromLocalStorage(parent)
        }
    } else {
        console.log('Tidak ada delete todo');
    }
}

function deleteTodoFromLocalStorage(deleteElement) {
    const todos = getItemFromLocalStorage();
    // looping array todos yg ada dan buat 2 argumen yg 1 untuk text todo nya yg satu index nya 
    // argument todo itu textContent nya, index itu index dari textcontent nya
    todos.forEach((todo, index) => {

        // buat logic untuk menyamakan text content dari localstorage
        if (deleteElement.firstChild.textContent === todo) {
            todos.splice(index, 1); 
        }
    });
    // jika kondisi terpenuhi semua jangan lupa kembalikan data todos ini ke localeStorage dan jangan lupa confirt ke string
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearTodos(e) {
    e.preventDefault();
    todoList.innerHTML = '';
}

function filterTodos(e) {
    // mengambil text sesuai dengan inputan user 
    const filterText = e.target.value;
    // mengambil semua element yg memiliki class todo-item
    const todosItem = document.querySelectorAll('.todo-item');
    // todosItem ini akan melakaukan foreach masing masing element 
    todosItem.forEach((item) => {
        // mengambil text element dan melakukan convert ke huruf kecil
        let itemText = item.firstChild.textContent.toLocaleLowerCase();
        // membuat logic jika item tidak -1 artinya ada kata / daftar / list yg di cari oleh user
        if (itemText.indexOf(filterText) !== -1) {
            item.setAttribute('style', 'display: block;')
        } else {
            item.setAttribute('style', 'display: none !important;');
        }
    })


}