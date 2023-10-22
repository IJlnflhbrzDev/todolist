const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterInputTodo = document.getElementById('filter-input');
const clearButton = document.getElementById('clear-todos');

// Membuat event submit pada form ketika ada user submit button
todoForm.addEventListener('submit', addTodo);
// membuat event click pada list todo yg dibuat oleh user ketika user klik tombol delete
todoList.addEventListener("click", deleteTodo);
// membuar event clisc untuk menghapus semua todolis sekaligus
clearButton.addEventListener('click', clearTodos);
// Membuat event filter todolist atau pencarian todolist
filterInputTodo.addEventListener('keyup', filterTodos);

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {

        // membuat element li untuk menampung value dari todo input 
        const li = document.createElement('li');
        // Menambahkan Banyak class ke dalam li
        li.className= 'todo-item list-group-item d-flex justify-content-between align-items-center mb-1';
        // isi content li dari value todoInput mengunakan documen create textnode
        li.appendChild(document.createTextNode(todoInput.value));
        
    
         // membuat tombolDelete masing masing value dari li 
         const deleteList = document.createElement('a');
         deleteList.href = '#'
         deleteList.className = 'badge badge-danger delete-todo';
         deleteList.textContent = 'Delete';
    
         // MENGABUNGKAN ELEMEN A DI DALAM LI
         li.appendChild(deleteList);
    
         // MENGABUNGKAN LI KEDALAM LIST GROUP 
        todoList.appendChild(li);
    
        // memangil function untuk set data per masing masing todolist ke localeStorage
        // addTodoToLocaleStorage(todoInput.value);

        // menghapus inputan user ketika list sudah di tambahkan 
        todoInput.value = '';

    }else{
        alert('todolist gaboleh kosong!!')
    }

}

// membuat function untuk masukan data todolist ke localeStorage
function addTodoToLocaleStorage(todoInputValue) {
   // membuat variabel kosong untuk menampung array todos
   let todos;
   // membuat kondisi jika locale storage kosong maka variabel todos di ubah menjadi array kosong
   if(localStorage.getItem('todos' == null)){
    todos = [''];
   }else {
    // jika tidak kosong maka parsing json todos 
    todos = JSON.parse(localStorage.getItem('todos'));
   }

   // push setiap todos yg di buat user ke variabel todos 
   todos.push(todoInputValue);
   // setelah push ke variabel todos 
   // maka set ke localeStorage, dan jangan lupa data localeStorage harus strng 
   // maka dari itu convert terlebih dahulu datanya
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
        }
    }else{
        console.log('Tidak ada delete todo');
        console.log(e);
    }
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
            item.setAttribute('style','display: block;')
        }else {
            item.setAttribute('style', 'display: none !important;');
        }
    })


}