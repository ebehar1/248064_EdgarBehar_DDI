let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;

contenido.style.width = "1000px";

function cambiarColor(color) {
    contenido.style.background = color;
}

function cambiarTamanio(ancho, alto){
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

function cambiarTamanioIntervalo(){
    if (contenido.style.width == "1000px") {
        cambiarTamanio("500px", "500px");
    }
        else{
            cambiarTamanio("1000px", "1000px");
        }
}

boton.addEventListener('click', ()=> { //funciones flecha (se ejecuta de manera anonima)
    if (bandera) {
        cambiarColor("white");
        cambiarTamanio("1000px", "1000px");
        bandera = false;
    } else{
        cambiarColor("blue");
        cambiarTamanio("500px", "500px");
        bandera = true;
    }
});

setInterval(cambiarTamanioIntervalo,1000);

