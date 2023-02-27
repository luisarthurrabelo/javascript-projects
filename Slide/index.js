var points = document.querySelector('.points');
var quant = document.querySelectorAll('.slides .image');

var atual = 0;

var imagem = document.getElementById('atual');
var next = document.getElementById('next');
var back = document.getElementById('back');

var rolar = true;

var title = document.querySelector('h2');
var closeButton = document.querySelector('#close');

//Events

for(let i = 0; i < quant.length; i++){

    var div = document.createElement('div');
    div.id = i;
    points.appendChild(div);
}

document.getElementById('0').classList.add('imgAtual');

var pos = document.querySelectorAll('.points div');

for(let i = 0; i < pos.length; i++) {
    pos[i].addEventListener('click', ()=>{
        atual = pos[i].id;
        rolar = false;
        slide();
    })
}

back.addEventListener('click', ()=>{
    atual--;
    rolar = false;
    slide();
})

next.addEventListener('click', ()=>{
    atual++;
    rolar = false;
    slide();
})

for(let image of quant){
    image.addEventListener('mouseover', event =>{
        title.classList.add('show');
        image.classList.add('opacity');
    });

    title.addEventListener("mouseover", function(){
        title.classList.add('show');
        image.classList.add('opacity');
    });

    image.addEventListener('mouseout', event =>{
        title.classList.remove('show');
        image.classList.remove('opacity');
    });

    image.addEventListener('click', openBox);
    closeButton.addEventListener("click", closeBox);
}

//Functions

function slide(){
    if(atual >= quant.length){
        atual = 0;
    }
    else if(atual < 0){
        atual = quant.length-1
    }
    
    document.querySelector('.imgAtual').classList.remove('imgAtual');
    imagem.style.marginLeft = -680 * atual + 'px';
    document.getElementById(atual).classList.add('imgAtual');
}

function openBox(){
    document.querySelector('.info_box').style.display = 'flex';
}

function closeBox(){
    document.querySelector('.info_box').style.display = 'none';
}

setInterval(()=>{
    if(rolar){
        atual++;
        slide();
    }
    else{
        rolar = true;
    }
}, 4000);

slide();
