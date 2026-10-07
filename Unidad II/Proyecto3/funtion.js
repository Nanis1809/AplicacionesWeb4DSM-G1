const btnTema = document.querySelector('#btn_cambio');

const divs = document.querySelectorAll(
    '#MFHS-div1, #MFHS-div2, #MFHS-div3, #MFHS-div4, #MFHS-div5, #MFHS-div6, #MFHS-div7, #MFHS-div8'
);

btnTema.addEventListener('click', () => {

    divs.forEach((div) => {
        div.style.backgroundColor = '#d2b4de';
    });

    console.log('Color de todos los divs cambiado');

});