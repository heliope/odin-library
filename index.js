
document.addEventListener("DOMContentLoaded",() => {
    
    const inputUser = document.getElementById("name");
    const regexInput = /^[\p{L}\p{N}]+$/u // \p{L} qualquer letra incluíndo as acentuadas, \p{N}, qualquer numero, /u flag para unicode
    const registerButton = document.getElementById("register");

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

        const container = document.querySelector(".blur");
        const formLogin = document.getElementById("form-welcome");
        const addBookForm = document.getElementById("add-book")

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
})






