
// Lógica da Programação

const myLibrary = [];

// Constructor
function Book(title,author,pages,isread) {
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
}   

function addBookToLibrary(title,author,pages,isread) {

    const book = new Book(title,author,pages,isread);
    
    myLibrary.push(book)
}


document.addEventListener("DOMContentLoaded",() => {
    
    const inputUser = document.getElementById("name");
    const regexInput = /^[\p{L}\p{N}]+$/u // \p{L} qualquer letra incluíndo as acentuadas, \p{N}, qualquer numero, /u flag para unicode
    const registerButton = document.getElementById("register");
    const addBookForm = document.getElementById("add-book")
    const bookAuxiliar = document.getElementById("books-auxiliar");
    const container = document.querySelector(".blur");
    const formLogin = document.getElementById("form-welcome");
    const headerBook = document.getElementById("headerBook");
    const tableBookTr= document.getElementById("book-table-body");
    const addBookFormUpdate = document.getElementById("update-book");        
    const inputUserRegisterBookUpdate = document.getElementById("book-add-update")
    const inputUserIsreadUpdate = document.getElementById("book-isread-update");
    const inputUserBookTitleUpdate = document.getElementById("book-name-update");
    const inputUserBookPagesUpdate = document.getElementById("book-pages-update");
    const inputUserBookAuthorUpdate = document.getElementById("book-author-update");
    const closeEditButton = document.getElementById("book-cancel-update");
    let targetRow = "";

    // Valida os caracteres introduzidos no input de entrada
    inputUser.addEventListener("keyup",(e) => {
        
        const inputUserRegex = e.target.value.match(regexInput);
        
        if (e.key === " ") {
            
            alert("O seu nome não pode conter espaços!");
            inputUser.value = inputUser.value.slice(0,-1);
        }

        if ( inputUserRegex != null) {

            if(!inputUserRegex) {
                
                alert("Caracteres inválidos");
                inputUser.value = inputUser.value.slice(0,-1);                  

            } else if (inputUser.value.length < 11 && inputUser.value.length > 2) {
                
                registerButton.removeAttribute("disabled");
                inputUser.style.borderBottomColor = "#ff7f04";               
            }

            else {
                registerButton.setAttribute("disabled", "true") 
            }
            
        } else {
            inputUser.style.borderBottomColor = "#aaa";
        }
    })

    // Botão Cancelar -> fecha a o separador ativo
    const quitButton = document.getElementById("cancel");

    quitButton.addEventListener("click", () => {

        const windowClose = confirm("Do you want close this window?");

        if (windowClose) {
            window.close();
        }
    })

    // Botão Registar -> ao começar Registo
    registerButton.addEventListener("click", () => {

        // Retira o Desfocado
        document.getElementById("title").textContent = `${inputUser.value} - Library`
        container.classList.remove("blur");

        // Oculta o formulário
        formLogin.classList.remove("grid");
        formLogin.classList.add("hidden");
        
        //MostraFormulário do adicionar Livro
        addBookForm.classList.remove("hidden");
        addBookForm.classList.add("grid");
    })

    // Começar o registo do Livro
    const inputUserRegisterBook = document.getElementById("book-add")
    const inputUserIsread = document.getElementById("book-isread");
    const inputUserBookTitle = document.getElementById("book-name");
    const inputUserBookPages = document.getElementById("book-pages");
    const inputUserBookAuthor = document.getElementById("book-author");
    const regexInputPages = /^[0-9]+$/;

    // Validação do Título
    function checkUserRegisterBookInputTitle(inputUserBookTitle,inputUserRegisterBook,inputUserBookPages,inputUserBookAuthor) {
               
        if (inputUserBookTitle.value.trim().length >2) {
                
            inputUserBookTitle.style.color = "green"
        
        } else {
            
            inputUserBookTitle.style.color = "black"
        }

        // Verifica se todos os inputs estão preenchidos
        if (inputUserBookTitle.style.color ==="green" && inputUserBookPages.style.color ==="green" && inputUserBookAuthor.style.color ==="green") {
    
            inputUserRegisterBook.removeAttribute("disabled");
        
        } else {
            
            inputUserRegisterBook.setAttribute("disabled", true);
        }   
    }

    // Validação do número de Páginas
    function checkUserRegisterBookInputPages(inputUserBookPages,inputUserBookTitle,inputUserBookAuthor,inputUserRegisterBook) {
                
        if (regexInputPages.test(inputUserBookPages.value)) {
    
            if( inputUserBookPages.value <1) {
                
                inputUserBookPages.style.color = "black"

            } else {

                inputUserBookPages.style.color = "Green"
            }
        
        } else {
                inputUserBookPages.style.color = "black";
        }

        // Verifica se todos os inputs estão preenchidos
        if(inputUserBookTitle.style.color ==="green" && inputUserBookPages.style.color ==="green" && inputUserBookAuthor.style.color ==="green") {
    
            inputUserRegisterBook.removeAttribute("disabled");
        
        } else {
            
            inputUserRegisterBook.setAttribute("disabled", true);
        }     
    }

    // Validação do nome do Autor
    function checkUserRegisterBookInputAuthor(inputUserBookAuthor,inputUserBookTitle,inputUserBookPages) {
        
        if ( inputUserBookAuthor.value.length> 1 && inputUserBookAuthor.value.length <= 30 ) {
            
            inputUserBookAuthor.style.color = "green";
        
        } else {
            
            inputUserBookAuthor.style.color = "black";
        }

        // Verifica se todos os inputs estão preenchidos
        if(inputUserBookTitle.style.color ==="green" && inputUserBookPages.style.color ==="green" && inputUserBookAuthor.style.color ==="green") {
    
            inputUserRegisterBook.removeAttribute("disabled");
        
        } else {
            
            inputUserRegisterBook.setAttribute("disabled", true);
        }
    }

    // Desbloquear o Botão de Registar Livro

    inputUserBookTitle.addEventListener('input', () => checkUserRegisterBookInputTitle(inputUserBookTitle,inputUserRegisterBook,inputUserBookPages,inputUserBookAuthor));
    inputUserBookPages.addEventListener('input', () => checkUserRegisterBookInputPages(inputUserBookPages,inputUserBookTitle,inputUserBookAuthor,inputUserRegisterBook));
    inputUserBookAuthor.addEventListener('input', () => checkUserRegisterBookInputAuthor(inputUserBookAuthor,inputUserBookTitle,inputUserBookPages));

    inputUserBookPages.addEventListener("blur", () => {

        if (!regexInputPages.test(inputUserBookPages.value)) {
            
            alert("Só é possivel inserir digitos numéricos");
            inputUserBookPages.value="";
        }
    })

    // Adicionar novo Livro
    inputUserRegisterBook.addEventListener("click", () => {

        addBookToLibrary(inputUserBookTitle.value, inputUserBookAuthor.value, inputUserBookPages.value, inputUserIsread.checked, inputUserRegisterBook.value);

        const divBook = document.getElementById("books-auxiliar");
        const newBookTr = document.createElement("tr");
        tableBookTr.appendChild(newBookTr);

        // Adiciona nome do Livro      
        const newBookTitleTd = document.createElement("td");
        newBookTitleTd.textContent = inputUserBookTitle.value;
        newBookTr.appendChild(newBookTitleTd);

        // Adiciona nome do Livro
        const newBookAuthorTd = document.createElement("td");
        newBookAuthorTd.textContent = inputUserBookAuthor.value;
        newBookTr.appendChild(newBookAuthorTd);

        // Adiciona Páginas do Livro
        const newBookPagesTd = document.createElement("td");      
        newBookPagesTd.textContent = inputUserBookPages.value;
        newBookTr.appendChild(newBookPagesTd);

        // Aciciona se o Livro foi lido ou não
        const newBookIsreadTd = document.createElement("td");
        newBookTr.appendChild(newBookIsreadTd);
        
        if ( inputUserIsread.checked) {
            
            const sgvIsread = document.createElement("button");
            sgvIsread.classList.add("button-isRead")
            newBookIsreadTd.appendChild(sgvIsread);
        
        } else {

            const svgNotRead = document.createElement("button");
            svgNotRead.classList.add("button-notRead");
            newBookIsreadTd.appendChild(svgNotRead);

        }

        // Adiciona o botão Edit
        const newBookEdit = document.createElement("td");
        const svgEdit = document.createElement("button");

        newBookTr.appendChild(newBookEdit);
        newBookEdit.appendChild(svgEdit);

        svgEdit.classList.add("button-edit")
        
        // Adiciona o botão Delete
        const newBookDelete = document.createElement("td");
        const svgDelete = document.createElement("button");

        newBookTr.appendChild(newBookDelete);
        newBookDelete.appendChild(svgDelete);

        svgDelete.classList.add("button-delete");
        
        // Mostra Tabela
        divBook.classList.remove("hidden");
        
        // Oculta formulário
         addBookForm.classList.add("hidden");
         addBookForm.classList.remove("grid");

        // Configura a tabela dos Livros
        bookAuxiliar.style.display="flex";
        bookAuxiliar.style.flexDirection="row";
        bookAuxiliar.style.justifyContent="center";

        // Formata as linhas da tabela
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach((row,index) => {
            
            if(index % 2 === 0) {
                
                row.classList.add("even-row");
            
            } else {

                row.classList.add("odd-row")
            }
        })

        //Configura Titulo da tabela
        headerBook.textContent = `${inputUser.value} - Library`
        inputUserRegisterBook.setAttribute("disabled", true);

        const rowNumber =  tableBookTr.rows.length +1;
        newBookTr.id= rowNumber;

        console.log(myLibrary);
    })

    // Criar novo Livro
    const addNewBook = document.getElementById("add-book-new");

    addNewBook.addEventListener("click", () => {
        
        // Retira o Desfocado
        container.classList.remove("blur");
      
        //MostraFormulário do adicionar Livro
        addBookForm.classList.add("grid");
        addBookForm.classList.remove("remove");

        // Oculta Titulo
        bookAuxiliar.style.display="none";
        headerBook.style.display="none";

        // Reset Formulário
        inputUserBookTitle.value="";
        inputUserBookPages.value="";
        inputUserBookAuthor.value="";
        inputUserIsread.checked = false;
    })

    // Eliminar todos os Livros
    const deleteBookAll = document.getElementById("delete-book-all");

    deleteBookAll.addEventListener("click", () => {
        
        while (tableBookTr.firstChild) {
            tableBookTr.removeChild(tableBookTr.firstChild);
        }
    })

    // Clica na edição de um livro
    tableBookTr.addEventListener("click", (e) => {

        targetRow = e.target.parentElement.parentElement.id-2
      
        //MostraFormulário do adicionar Livro
        addBookFormUpdate.classList.add("grid");
        addBookFormUpdate.classList.remove("remove");

        inputUserBookTitleUpdate.value = myLibrary[targetRow].title
        inputUserBookPagesUpdate.value = myLibrary[targetRow].pages
        inputUserBookAuthorUpdate.value = myLibrary[targetRow].author

                
        if (  myLibrary[targetRow].isread === true ) {
            
            inputUserIsreadUpdate.checked = true;
        } else {

            inputUserIsreadUpdate.checked = false;
        }


        inputUserBookTitleUpdate.style.color = "green";
        inputUserBookPagesUpdate.style.color = "green";
        inputUserBookAuthorUpdate.style.color = "green";
        inputUserRegisterBookUpdate.removeAttribute("disabled")

        inputUserBookTitleUpdate.addEventListener('input', () => checkUserRegisterBookInputTitle(inputUserBookTitleUpdate,inputUserRegisterBookUpdate,inputUserBookPagesUpdate,inputUserBookAuthorUpdate));
        inputUserBookPagesUpdate.addEventListener('input', () => checkUserRegisterBookInputPages(inputUserBookPagesUpdate,inputUserBookTitleUpdate,inputUserBookAuthorUpdate,inputUserRegisterBookUpdate));
        inputUserBookAuthorUpdate.addEventListener('input', () =>checkUserRegisterBookInputAuthor(inputUserBookAuthorUpdate,inputUserBookTitleUpdate,inputUserBookPagesUpdate));


        // Começar update do Livro
    
        inputUserBookPages.addEventListener("blur", () => {
    
            if (!regexInputPages.test(inputUserBookPagesUpdate.value)) {
                
                alert("Só é possivel inserir digitos numéricos");
                inputUserBookPagesUpdate.value="";
            }


        })

    })

    
        // Update do Livro
        inputUserRegisterBookUpdate.addEventListener("click", () => {

            myLibrary[targetRow].title  = inputUserBookTitleUpdate.value;
            myLibrary[targetRow].author  = inputUserBookAuthorUpdate.value;
            myLibrary[targetRow].pages = inputUserBookPagesUpdate.value;
            console.log(tableBookTr.children[targetRow]);
            
            if ( inputUserIsreadUpdate.checked ) {   

                tableBookTr.children[targetRow].children[3].children[0].classList.add("button-isRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.remove("button-notRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.add("button-isRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.remove("button-notRead");
                myLibrary[targetRow].isread = true;
            
            } else {

                tableBookTr.children[targetRow].children[3].children[0].classList.remove("button-isRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.add("button-notRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.remove("button-isRead");
                tableBookTr.children[targetRow].children[3].children[0].classList.add("button-notRead");
                myLibrary[targetRow].isread = false;
            } 

            
            tableBookTr.children[targetRow].children[0].textContent = myLibrary[targetRow].title 
            tableBookTr.children[targetRow].children[1].textContent= myLibrary[targetRow].author 
            tableBookTr.children[targetRow].children[2].textContent = myLibrary[targetRow].pages

            console.log(tableBookTr.children[targetRow]);

            
            addBookFormUpdate.classList.add("hidden");
            addBookFormUpdate.classList.remove("grid");
            
        })  
    // Fecha Edição do Livro
    closeEditButton.addEventListener("click", () => {

        addBookFormUpdate.classList.add("hidden");
        addBookFormUpdate.classList.remove("grid");
    })

})









