let densityControl = document.querySelector('.rangeDensity');
densityControl.value = 30;
document.getElementById('rangeValue').innerHTML = '30%' ;
var mouseIsPressed = false;
var paintMode = true;
let gridLen = 13;
gridToFactory(gridLen);

document.addEventListener('mousedown', function(e) {
    mouseIsPressed = true; 
});
document.addEventListener('mouseup', function(e) {
    mouseIsPressed = false; 
});

densityControl.addEventListener(('change', 'mousemove'), function (e) {  
    document.getElementById('rangeValue').innerHTML = e.target.value + '%' ;
});

// GRID
function gridToFactory(numberForPlot){
    let playroom = document.querySelector('.playroom');
    const fragment = document.createDocumentFragment();

    removeAllChildNodes(playroom);

    let magicNumber = (Number(playroom.offsetWidth) ) / numberForPlot;

    for (let i = 0; i < numberForPlot ** 2; i++) {
        const div = document.createElement("div");

        div.className = "box";
        div.style.height = magicNumber+'px';
        div.style.width = magicNumber+'px';
        div.dataset.pressure = 0;

        fragment.appendChild(div);
    }

    playroom.appendChild(fragment);

    // addEventListeners
    let box = document.querySelectorAll('.box');


    for (let i = 0; i < box.length; i++) {

        box[i].addEventListener(('mousemove'), function(e)  {
            if (mouseIsPressed){
                let pressureLevel = document.querySelector('.rangeDensity').value /100;
                let pressure = e.target.dataset.pressure;

                if(paintMode){
                    
                    if(pressure < 1){
                        e.target.dataset.pressure = Number(pressure) + pressureLevel;
                        e.target.style.opacity = e.target.dataset.pressure;
                    }
                }else{
                    if(pressure > 0){
                        e.target.dataset.pressure = 0;
                        e.target.style.opacity = 0;
                    }
                }
            }
        });

        box[i].addEventListener(('click'), function(e)  {
            // if(e.type == 'click'){console.log('clieck esta verificado');}
            let pressureLevel = document.querySelector('.rangeDensity').value /100;
            let pressure = e.target.dataset.pressure;

            if(paintMode){
                
                if(pressure < 1){
                    e.target.dataset.pressure = Number(pressure) + pressureLevel;
                    e.target.style.opacity = e.target.dataset.pressure;
                }
            }else{
                if(pressure > 0){
                    e.target.dataset.pressure = 0;
                    e.target.style.opacity = 0;
                }
            }
        });
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.querySelector('.resetPlayroom').addEventListener('click', function(e) {    
    gridToFactory(gridLen);
});

document.querySelector('.eraseMode').addEventListener('click', function(e) {
    paintMode = !paintMode;
    e.target.classList.toggle('eraseMode');
});

function setGridLen(glen){
    gridLen = glen;
}

document.querySelector('.gridDensityDefault').addEventListener('click', function(e) {
    setGridLen(13);
    gridToFactory(gridLen);
});

document.querySelector('.gridDensityCustom').addEventListener('click', function(e) {

    let customlen;
    let iter = true;

    while(iter){
        customlen = prompt('Enter a number between 3 and 50');

        if(customlen === null) {
            iter = false; 
            return; 
        }
        if(typeof Number(customlen) == 'number' && customlen > 2 && customlen <= 50 ){
            iter = false;   
        }else{
            customlen = prompt('Enter a number between 3 and 50');
        }
    }
    document.querySelector('.squares').innerHTML = customlen + ' x ' + customlen;
    setGridLen(customlen);
    gridToFactory(customlen);
});