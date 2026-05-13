import {
    Cuadrado, Linea, Sticker, Circulo, FiguraPersonalizada
} from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

//Cursor
function obtenerPosicion(event) {

    const rect = canvas.getBoundingClientRect();

    return {

        x: (event.clientX - rect.left) *
            (canvas.width / rect.width),

        y: (event.clientY - rect.top) *
            (canvas.height / rect.height)
    };
}

let presionado = false;

let herramientaActual = "pincel";

let colorLinea = "#000000";

let colorRelleno = "#ff0000";

let grosor = 5;

let imagenSticker = "../recursos/Leon.jpg";

let inicio = null;

//Historial
let historial = [];

let pasoActual = -1;

let canvasBase = null;

function guardarEstado() {

    pasoActual++;

    historial = historial.slice(0, pasoActual);

    const data = canvas.toDataURL();

    historial.push(data);

    canvasBase = data;
}

//Cambiar herramienta
document.querySelector("#btnPincel").onclick = () => {
    herramientaActual = "pincel";
};

document.querySelector("#btnLinea").onclick = () => {
    herramientaActual = "linea";
};

document.querySelector("#btnCuadro").onclick = () => {
    herramientaActual = "cuadro";
};

document.querySelector("#btnCirculo").onclick = () => {
    herramientaActual = "circulo";
};

document.querySelector("#btnFigura").onclick = () => {
    herramientaActual = "figura";
};

document.querySelector("#btnSticker").onclick = () => {
    herramientaActual = "sticker";
};

document.querySelector("#btnBorrador").onclick = () => {
    herramientaActual = "borrador";
};

//Colores y grosor
document.querySelector("#colorLinea").oninput = (e) => {
    colorLinea = e.target.value;
};

document.querySelector("#colorRelleno").oninput = (e) => {
    colorRelleno = e.target.value;
};

document.querySelector("#grosor").oninput = (e) => {
    grosor = parseInt(e.target.value);
};

//Cargar Imagen
document.querySelector("#inputImagen").onchange = (e) => {

    const file = e.target.files[0];

    if (file) {

        imagenSticker = URL.createObjectURL(file);
    }
};

//Limpiar
document.querySelector("#btnLimpiar").onclick = () => {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    guardarEstado();
};

//Guardar imagen
document.querySelector("#btnGuardar").onclick = () => {

    const link = document.createElement("a");

    link.download = "dibujo.png";

    link.href = canvas.toDataURL();

    link.click();
};

//Deshacer
document.querySelector("#btnDeshacer").onclick = () => {

    if (pasoActual <= 0) return;

    pasoActual--;

    const img = new Image();

    img.src = historial[pasoActual];

    img.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(img, 0, 0);

        canvasBase = historial[pasoActual];
    };
};

//Rehacer
document.querySelector("#btnRehacer").onclick = () => {

    if (pasoActual >= historial.length - 1) return;

    pasoActual++;

    const img = new Image();

    img.src = historial[pasoActual];

    img.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(img, 0, 0);

        canvasBase = historial[pasoActual];
    };
};

//Filtros
function aplicarFiltro(tipo) {

    if (!canvasBase) return;

    const img = new Image();

    img.src = canvasBase;

    img.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            switch (tipo) {

                case "bn":

                    const gris = (r + g + b) / 3;

                    data[i] = gris;
                    data[i + 1] = gris;
                    data[i + 2] = gris;
                    break;

                case "rojo":

                    data[i] = r;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                    break;

                case "verde":

                    data[i] = 0;
                    data[i + 1] = g;
                    data[i + 2] = 0;
                    break;

                case "azul":

                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = b;

                    break;

                case "sepia":

                    data[i] =
                        0.393 * r +
                        0.769 * g +
                        0.189 * b;

                    data[i + 1] =
                        0.349 * r +
                        0.686 * g +
                        0.168 * b;

                    data[i + 2] =
                        0.272 * r +
                        0.534 * g +
                        0.131 * b;

                    break;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    };
}

document.querySelector("#btnBN").onclick = () => {
    aplicarFiltro("bn");
};

document.querySelector("#btnRojo").onclick = () => {
    aplicarFiltro("rojo");
};

document.querySelector("#btnVerde").onclick = () => {
    aplicarFiltro("verde");
};

document.querySelector("#btnAzul").onclick = () => {
    aplicarFiltro("azul");
};

document.querySelector("#btnSepia").onclick = () => {
    aplicarFiltro("sepia");
};

canvas.addEventListener("mousedown", (e) => {

    inicio = obtenerPosicion(e);

    presionado = true;
});

canvas.addEventListener("mousemove", (e) => {

    if (!presionado) return;

    const actual = obtenerPosicion(e);

    //Pincel y borrador
    if (
        herramientaActual === "pincel" ||
        herramientaActual === "borrador"
    ) {

        const color =
            herramientaActual === "borrador"
                ? "white"
                : colorLinea;

        new Linea(
            {
                iniciales: inicio,
                finales: actual
            },
            color,
            grosor
        ).Dibujar(ctx);

        inicio = actual;
    }

    else {

        if (historial.length > 0) {

            const img = new Image();

            img.src = historial[pasoActual];

            img.onload = () => {

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                ctx.drawImage(img, 0, 0);

                dibujarPreview(
                    inicio,
                    actual
                );
            };
        }
    }
});

canvas.addEventListener("mouseup", (e) => {

    if (!presionado) return;

    const fin = obtenerPosicion(e);

    switch (herramientaActual) {

            //Linea
        case "linea":

            new Linea(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                grosor
            ).Dibujar(ctx);

            break;

        //Cuadrado
        case "cuadro":

            new Cuadrado(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                colorRelleno,
                grosor
            ).Dibujar(ctx);

            break;

        //Circulo
        case "circulo":

            new Circulo(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                colorRelleno,
                grosor
            ).Dibujar(ctx);

            break;

        //Personalizada
        case "figura":

            new FiguraPersonalizada(
                {
                    iniciales: inicio
                },
                colorRelleno
            ).Dibujar(ctx);

            break;

        //Sticker
        case "sticker":

            new Sticker(
                {
                    iniciales: inicio
                },
                imagenSticker
            ).Dibujar(ctx);

            break;
    }

    guardarEstado();

    presionado = false;
});

function dibujarPreview(inicio, fin) {

    switch (herramientaActual) {

        case "linea":

            new Linea(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                grosor
            ).Dibujar(ctx);

            break;

        case "cuadro":

            new Cuadrado(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                colorRelleno,
                grosor
            ).Dibujar(ctx);

            break;

        case "circulo":

            new Circulo(
                {
                    iniciales: inicio,
                    finales: fin
                },
                colorLinea,
                colorRelleno,
                grosor
            ).Dibujar(ctx);

            break;

        case "figura":

            new FiguraPersonalizada(
                {
                    iniciales: inicio
                },
                colorRelleno
            ).Dibujar(ctx);

            break;
    }
}
re
guardarEstado();