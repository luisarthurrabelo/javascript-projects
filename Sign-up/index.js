const fields = document.querySelectorAll('[required]')

function validateField(field){
    
    function verifyErrors(){
        let foundError = false;

        const name = document.querySelector('.name-input')
        const pass1 = document.querySelector('.password-input')
        const pass2 = document.querySelector('.password2-input')

        for(let error in field.validity){
            
            const letters = /^[A-Za-z]+$/;

            if(field.validity[error] && !field.validity.valid){
                foundError = error;
            }

            if(!name.value.match(letters) && name.value != '' ||(pass1.value != pass2.value && pass1.value != '' && pass2.value != '')){
                field.setCustomValidity('error');
            }
            else{
                field.setCustomValidity('');
            }
        }

        return foundError;
    }

    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: "Campo obrigatório",
                tooShort: "O campo precisa ter no minímo 4 caracteres",
                tooLong: "O campo pode ter no mpaximo 20 caracteres",
                customError: "Apenas letras são permitidos"
            },
            email: {
                valueMissing: "Campo obrigatório",
                typeMismatch: "Digite um email válido"
            },
            password: {
                valueMissing: "Campo obrigatório",
                tooShort: "O campo precisa ter no minímo 5 caracteres",
                tooLong: "O campo pode ter no mpaximo 20 caracteres",
                customError: "As senhas não conferem"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message){

        const spanError = field.parentNode.parentNode.querySelector('span.error')

        if(message){
            spanError.style.display = 'flex';
            spanError.innerHTML = message;
        }
        else{
            spanError.style.display = 'none';
            spanError.innerHTML = "";
        }
    }

    return function(){

        const error = verifyErrors();
        const errorIndicator = field.parentNode

        if(error){
            const message = customMessage(error);

            errorIndicator.classList.add('error-input');
            errorIndicator.classList.add('shake-horizontal');

            setTimeout(function(){
                errorIndicator.classList.remove('shake-horizontal');
            },1500);

            setCustomMessage(message);
        }
        else{
            errorIndicator.classList.remove('error-input');
            setCustomMessage();
        }
    };
}

function validation(event){

    const field = event.target;
    const validation = validateField(field);

    validation();
}

for(let field of fields){
    field.addEventListener('invalid', event =>{
        
        event.preventDefault();
        validation(event);
    });
    field.addEventListener('blur', validation);
}

document.querySelector('form').addEventListener('submit', event =>{

    console.log("enviar o formulário");
    document.querySelector(".name-input").value = "";
    document.querySelector(".email-input").value = "";
    document.querySelector(".password-input").value = "";
    document.querySelector(".password2-input").value = "";
    event.preventDefault();
})
