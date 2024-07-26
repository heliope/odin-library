
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
    function checkUserRegisterBookInputTitle() {
               
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
    function checkUserRegisterBookInputPages() {
                
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
    function checkUserRegisterBookInputAuthor() {
        
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
    inputUserBookTitle.addEventListener('input',checkUserRegisterBookInputTitle);
    inputUserBookPages.addEventListener('input',checkUserRegisterBookInputPages);
    inputUserBookAuthor.addEventListener('input',checkUserRegisterBookInputAuthor);

    inputUserBookPages.addEventListener("blur", () => {

        if (!regexInputPages.test(inputUserBookPages.value)) {
            
            alert("Só é possivel inserir digitos numéricos");
            inputUserBookPages.value="";
        }
    })

    // Adicionar novo Livro
    inputUserRegisterBook.addEventListener("click", () => {

        addBookToLibrary(inputUserBookTitle.value, inputUserBookAuthor.value, inputUserBookPages.value, inputUserRegisterBook.value);

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

        console.log(newBookTr)
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

        const targerRow = e.target
      
        //MostraFormulário do adicionar Livro
        addBookForm.classList.add("grid");
        addBookForm.classList.remove("remove");



    })

})









