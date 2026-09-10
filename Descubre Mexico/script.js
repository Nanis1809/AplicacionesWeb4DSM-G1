function agregarFavorito(nombre, imagen, enlace) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let existe = favoritos.some(favorito => favorito.nombre === nombre);

    if (existe) {
        alert("Este destino ya está en tus favoritos.");
        return;
    }

    favoritos.push({
        nombre: nombre,
        imagen: imagen,
        enlace: enlace
    });

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("❤️ " + nombre + " se agregó a tus favoritos.");
}

function mostrarFavoritos() {

    const contenedor = document.getElementById("lista-favoritos");

    if (!contenedor) {
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {

        contenedor.innerHTML = `
            <div class="sin-favoritos">
                <h2> Todavía no tienes favoritos</h2>
                <p>
                    Explora nuestros destinos y agrega los lugares
                    que quieras visitar.
                </p>
                <a href="destinos.html" class="btn">
                    Explorar destinos
                </a>
            </div>
        `;

        return;
    }

    contenedor.innerHTML = "";

    favoritos.forEach((favorito, indice) => {

        contenedor.innerHTML += `
            <div class="favorito-card">

                <img src="${favorito.imagen}" 
                     alt="${favorito.nombre}">

                <h3>${favorito.nombre}</h3>

                <a href="${favorito.enlace}">
                    Ver destino
                </a>

                <button 
                    class="btn-eliminar"
                    onclick="eliminarFavorito(${indice})">
                     Quitar
                </button>

            </div>
        `;
    });
}

function eliminarFavorito(indice) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.splice(indice, 1);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarFavoritos();
}

let calificacionSeleccionada = 0;

function seleccionarEstrella(numero) {

    calificacionSeleccionada = numero;

    const estrellas = document.querySelectorAll(".estrella");

    estrellas.forEach((estrella, indice) => {

        if (indice < numero) {
            estrella.classList.add("seleccionada");
            estrella.textContent = "★";
        } else {
            estrella.classList.remove("seleccionada");
            estrella.textContent = "☆";
        }

    });
}

function guardarExperiencia(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const destino = document.getElementById("destino");
    const comentario = document.getElementById("comentario");

    if (
        nombre.value.trim() === "" ||
        destino.value.trim() === "" ||
        comentario.value.trim() === ""
    ) {

        alert(" Completa todos los campos.");
        return;
    }

    if (calificacionSeleccionada === 0) {

        alert(" Selecciona una calificación.");
        return;
    }

    let experiencias =
        JSON.parse(localStorage.getItem("experiencias")) || [];

    const nuevaExperiencia = {

        nombre: nombre.value,

        destino: destino.value,

        comentario: comentario.value,

        calificacion: calificacionSeleccionada

    };

    experiencias.push(nuevaExperiencia);

    localStorage.setItem(
        "experiencias",
        JSON.stringify(experiencias)
    );

    alert(" ¡Tu experiencia fue publicada!");

    nombre.value = "";
    destino.value = "";
    comentario.value = "";

    calificacionSeleccionada = 0;

    document.querySelectorAll(".estrella").forEach(estrella => {
        estrella.textContent = "☆";
        estrella.classList.remove("seleccionada");
    });

    mostrarExperiencias();
}

function mostrarExperiencias() {

    const contenedor =
        document.getElementById("lista-experiencias");

    if (!contenedor) {
        return;
    }

    let experiencias =
        JSON.parse(localStorage.getItem("experiencias")) || [];

    if (experiencias.length === 0) {

        contenedor.innerHTML = `
            <p class="sin-experiencias">
                Todavía no hay experiencias publicadas.
                ¡Sé la primera persona en compartir una! 
            </p>
        `;

        return;
    }

    contenedor.innerHTML = "";

    experiencias.forEach(experiencia => {

        let estrellas = "";

        for (let i = 1; i <= 5; i++) {

            if (i <= experiencia.calificacion) {
                estrellas += "★";
            } else {
                estrellas += "☆";
            }

        }

        contenedor.innerHTML += `

            <div class="experiencia-card">

                <div class="estrellas-mostradas">
                    ${estrellas}
                </div>

                <h3>${experiencia.destino}</h3>

                <p>
                    "${experiencia.comentario}"
                </p>

                <strong>
                    — ${experiencia.nombre}
                </strong>

            </div>

        `;
    });
}

function filtrarDestinos(categoria) {

    const tarjetas =
        document.querySelectorAll(".destination-card");

    tarjetas.forEach(tarjeta => {

        const tipo =
            tarjeta.getAttribute("data-categoria");

        if (
            categoria === "todos" ||
            tipo === categoria
        ) {

            tarjeta.style.display = "block";

        } else {

            tarjeta.style.display = "none";

        }

    });
}

document.addEventListener("DOMContentLoaded", function() {

    mostrarFavoritos();

    mostrarExperiencias();

});