const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
// const filterInputTodo = document.getElementById('filter-input');
// const clearButton = document.getElementById('clear-todos');

// Membuat event submit pada form ketika ada user submit button
todoForm.addEventListener('submit', addTodo);
// membuat event click pada list todo yg dibuat oleh user ketika user klik tombol delete
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {

        // membuat element li untuk menampung value dari todo input 
        const li = document.createElement('li');
        // Menambahkan Banyak class ke dalam li
        li.className= 'list-group-item d-flex justify-content-between align-items-center mb-1';
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
    
        // menghapus inputan user ketika list sudah di tambahkan 
        todoInput.value = '';
    }else{
        alert('todolist gaboleh kosong!!')
    }


    // todoList.innerHTML = `
    // <li class="list-group-item d-flex justify-content-between align-items-center mb-1">
    //     ${todoInput.value}
    //     <a href="#" class="badge badge-danger">Delete</a>
    // </li>
    // `
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