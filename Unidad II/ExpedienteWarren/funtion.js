
const botonesDetalles = document.querySelectorAll(".boton-detalles");

botonesDetalles.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const tarjeta = boton.closest(".contenido-tarjeta");
        const detalle = tarjeta.querySelector(".detalle-expediente");

        detalle.textContent = boton.dataset.detalle;
        detalle.classList.toggle("visible");

        if (detalle.classList.contains("visible")) {
            boton.textContent = "Cerrar archivo";
        } else {
            boton.textContent = "Consultar archivo";
        }
    });
});

const formularioCaso = document.querySelector("#formulario-caso");

if (formularioCaso) {
    const mensajeFormulario = document.querySelector("#mensaje-formulario");
    const resultadoCaso = document.querySelector("#resultado-caso");

    formularioCaso.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const tipo = document.querySelector("#tipo").value;
        const ubicacion = document.querySelector("#ubicacion").value.trim();
        const fecha = document.querySelector("#fecha").value;
        const descripcion = document.querySelector("#descripcion").value.trim();

        if (!nombre || !correo || !tipo || !ubicacion ||
            !fecha || descripcion.length < 15) {

            mensajeFormulario.textContent =
                "Revisa los campos. Completa toda la información requerida.";
            mensajeFormulario.classList.add("error");
            mensajeFormulario.classList.remove("exito");
            return;
        }

        mensajeFormulario.textContent =
            "¡Expediente registrado señores!";
        mensajeFormulario.classList.add("exito");
        mensajeFormulario.classList.remove("error");

        resultadoCaso.innerHTML = "";

        const tarjeta = document.createElement("article");
        const titulo = document.createElement("h3");
        const parrafoNombre = document.createElement("p");
        const parrafoTipo = document.createElement("p");
        const parrafoUbicacion = document.createElement("p");
        const parrafoFecha = document.createElement("p");
        const parrafoDescripcion = document.createElement("p");

        titulo.textContent = "Expediente registrado";
        parrafoNombre.textContent = "Investigador: " + nombre;
        parrafoTipo.textContent = "Tipo de caso: " + tipo;
        parrafoUbicacion.textContent = "Ubicación: " + ubicacion;
        parrafoFecha.textContent = "Fecha: " + fecha;
        parrafoDescripcion.textContent = "Descripción: " + descripcion;

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(parrafoNombre);
        tarjeta.appendChild(parrafoTipo);
        tarjeta.appendChild(parrafoUbicacion);
        tarjeta.appendChild(parrafoFecha);
        tarjeta.appendChild(parrafoDescripcion);

        resultadoCaso.appendChild(tarjeta);
    });

    formularioCaso.addEventListener("reset", function() {
        mensajeFormulario.textContent = "";
        mensajeFormulario.classList.remove("exito", "error");
        resultadoCaso.innerHTML = "";
    });
}

function contarCaracteres(texto) {
    if (texto.length === 0) {
        return 0;
    }

    return 1 + contarCaracteres(texto.slice(1));
}

const campoDescripcion = document.querySelector("#descripcion");
const contadorDescripcion = document.querySelector("#contador-descripcion");

if (campoDescripcion && contadorDescripcion) {
    campoDescripcion.addEventListener("input", function() {
        const cantidad = contarCaracteres(campoDescripcion.value);
        contadorDescripcion.textContent =
            "Caracteres escritos: " + cantidad + " de 500";
    });
}
