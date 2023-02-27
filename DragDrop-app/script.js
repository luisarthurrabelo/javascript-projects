//Selectors
let lists = document.querySelectorAll('.list');
let add = document.querySelector('.add-card');
let listNumber;

let draggableCardd = null;

let closeButton = document.querySelector('.close');
let cardSubmit = document.querySelector('.btn-save');

document.addEventListener("DOMContentLoaded", getCards);

// Events
const handleAddNewCards = () => {

    cards = document.querySelectorAll('.card'); 

    cards.forEach(card => {
        registerEventOnCard(card);
        card.addEventListener("click", deleteCard);
    });
}

lists.forEach(list => {
    list.addEventListener('dragover', (e) =>{

        e.preventDefault();
        const afterElement = getCard(list, e.clientY)
        const draggingCard = document.querySelector('.dragging');

        if(afterElement){
            return list.insertBefore(draggingCard, afterElement);
        }

        list.appendChild(draggingCard);
    });
});

closeButton.addEventListener("click", closeBox);
cardSubmit.addEventListener('click', createCard);

// Functions
function getCard(list, y){

    const draggableElements = [...list.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest,child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset)
            return{offset, element: child}        
        else
            return closest
        

    }, {offset: Number.NEGATIVE_INFINITY}).element
}

function registerEventOnCard(card){

    card.addEventListener('dragstart', () => {    
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
}

function openBox(elem){
    document.querySelector('.card-page').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';


    if(elem.parentNode.classList.contains('0')){
        listNumber = 0;
    }
    if(elem.parentNode.classList.contains('1')){
        listNumber = 1;
    }
    if(elem.parentNode.classList.contains('2')){
        listNumber = 2;
    }
    if(elem.parentNode.classList.contains('3')){
        listNumber = 3;
    }
}

//Deleta o item
function deleteCard(e){
    const item = e.target;
    
    if(item.classList[0] === "remove-btn"){
        const card = item.parentElement;
        removeLocalStorage(card);
        card.remove();
    }
}

function closeBox(){
    document.querySelector('.card-page').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

function createCard(){

    const input = document.querySelector('.title');
    const text = document.querySelector('.content');

    if(!input.value == '' && !text.value == ''){

        const card_div = document.createElement('div');
        card_div.classList.add('card');
        card_div.setAttribute('draggable','true');

        // Criando o remover
        const card_delete = document.createElement("div");
        card_delete.innerHTML = '<i class="fas fa-trash"></i>';
        card_delete.classList.add('remove-btn');
        card_div.appendChild(card_delete);
    
        //Create Title
        const card_title = document.createElement("h3");
        card_title.innerText = input.value;
        card_div.appendChild(card_title);
    
        //Create Text
        const card_txt = document.createElement("p");
        card_txt.innerText = text.value;
        card_div.appendChild(card_txt);

        saveLocalCards(input.value, text.value, listNumber);

        lists[listNumber].appendChild(card_div);
        handleAddNewCards();
        
        input.value = '';
        text.value = '';
        closeBox();
        
    }
}

//Salva no local Storage
function saveLocalCards(title, content, position) {
    let cards;
    
    if(localStorage.getItem('cards') === null){
        cards = [];
    }
    else{
        cards = JSON.parse(localStorage.getItem('cards'));
    }

    cards.push(JSON.stringify({title, content, position}));
    localStorage.setItem('cards', JSON.stringify(cards));
}

//Printa os itens salvos no localStorage
function getCards() {
    let cards;

    if(localStorage.getItem('cards') === null){
        cards = [];
    }
    else{
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    
    cards.forEach(function(card){
        
        let myArray = card.split("\"");

        const card_div = document.createElement('div');
        card_div.classList.add('card');
        card_div.setAttribute('draggable','true');

        // Criando o remover
        const card_delete = document.createElement("div");
        card_delete.innerHTML = '<i class="fas fa-trash"></i>';
        card_delete.classList.add('remove-btn');
        card_div.appendChild(card_delete);
    
        // Criando o Título
        const card_title = document.createElement("h3");
        card_title.innerText = myArray[3];
        card_div.appendChild(card_title);
    
        // Criando o Texto
        const card_txt = document.createElement("p");
        card_txt.innerText = myArray[7];
        card_div.appendChild(card_txt);

        lists[myArray[10][1]].appendChild(card_div);
        handleAddNewCards();
    });
}

//Deleta os itens do localStorage
function removeLocalStorage(card){
    let cards;
    
    if(localStorage.getItem('cards') === null){
        cards = [];
    }
    else{
        cards = JSON.parse(localStorage.getItem('cards'));
    }

    const cardTitle = card.children[1].innerText;
    const cardContent = card.children[2].innerText;
    let i;
    
    for(i = 0; i < cards.length; i++) {
        if(cards[i].includes(cardTitle) == true && cards[i].includes(cardContent))
            break;
    }

    cards.splice(i, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
}
