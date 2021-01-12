//Book Constructor
    class Book {
        constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        }
    }

    //Local storage class
    class Store {
        static getBooks(){
            let books;
            if (localStorage.getItem('books') === null){
                books = [];
            } else {
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books
        }        

        static displayBooks(){
            const books = Store.getBooks();
            const ui = new UI;

            books.forEach(function(book){
                ui.addBookToList(book);
            });

        }   
        
        static addBook(book){
            const books = Store.getBooks();
            console.log('add book')
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }

        static removeBook(isbn){
            console.log(isbn);
            const books = Store.getBooks();
            books.forEach(function(book, index){
                if(book.isbn === isbn){
                    books.splice(index, 1);
                }
            });
            localStorage.setItem('books',JSON.stringify(books));
            
        }
    }

   class UI {
       addBookToList(book){        
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');  
        row.innerHTML = `
            <td>${book.title}</td> 
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
        
        //clear text fields
        title.value = '';
        author.value = '';
        isbn.value = '';
       }

       showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    
       }   

       deleteBook(target){
        if(target.classList.contains('delete')){
            if(confirm('Are you sure?')){
                target.parentElement.parentElement.remove();
            }
        } 
       }
   }
   
   document.addEventListener("DOMContentLoaded", Store.displayBooks());
   
   //Event Listeners
   document.getElementById('book-form').addEventListener("submit",function(e){
       const title = document.getElementById('title').value,
             author = document.getElementById('author').value,
             isbn = document.getElementById('isbn').value;
             
       const book = new Book(title, author, isbn);
       const ui = new UI();
       if(title === '' || author === '' || isbn === ''){
           ui.showAlert('Please enter all fields', 'error');
       } else {
           ui.addBookToList(book);
           Store.addBook(book);
           ui.showAlert('Book added','success')
       } 
       e.preventDefault();
   })
   
   document.getElementById('book-list').addEventListener("click", function(e){
       const ui = new UI();
       ui.deleteBook(e.target);

       //remove from local storage passing isbn
       Store.removeBook(e.target.parentElement.previousElementSibling.textContent); 

       ui.showAlert('Book deleted', 'success');
       e.preventDefault();
   })