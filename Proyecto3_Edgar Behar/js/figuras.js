class Figura {

    constructor(
        posicionesCursor,
        color_linea = "black",
        color_relleno = "transparent",
        grozor_linea = 5
    ) {

        // Posiciones inicial y final del cursor
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        };

        // Colores y grosor
        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grozor_linea = grozor_linea;
    }
}

//cuadrado
export class Cuadrado extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grozor_linea
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grozor_linea
        );

        this.x = Math.min(
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.finales.x
        );

        this.y = Math.min(
            this.posicionesCursor.iniciales.y,
            this.posicionesCursor.finales.y
        );

        // Calcular ancho y alto
        this.ancho = Math.abs(
            this.posicionesCursor.finales.x -
            this.posicionesCursor.iniciales.x
        );

        this.alto = Math.abs(
            this.posicionesCursor.finales.y -
            this.posicionesCursor.iniciales.y
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.lineWidth = this.grozor_linea;

        ctx.strokeStyle = this.color_linea;

        ctx.fillStyle = this.color_relleno;

        // Dibujar relleno
        ctx.fillRect(
            this.x,
            this.y,
            this.ancho,
            this.alto
        );

        // Dibujar borde
        ctx.strokeRect(
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}

// Linea
export class Linea extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        grozor_linea
    ) {

        super(
            posicionesCursor,
            color_linea,
            null,
            grozor_linea
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.lineWidth = this.grozor_linea;

        ctx.strokeStyle = this.color_linea;

        // Punto inicial
        ctx.moveTo(
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y
        );

        // Punto final
        ctx.lineTo(
            this.posicionesCursor.finales.x,
            this.posicionesCursor.finales.y
        );

        ctx.stroke();
    }
}

// Circulo
export class Circulo extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grozor_linea
    ) {

        super(
            posicionesCursor, color_linea, color_relleno, grozor_linea
        );

        this.radio = Math.sqrt(

            Math.pow(
                this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x,2
            )

            +

            Math.pow(
                this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y,2
            )
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.lineWidth = this.grozor_linea;

        ctx.strokeStyle = this.color_linea;

        ctx.fillStyle = this.color_relleno;

        ctx.arc(
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,
            this.radio,
            0,
            Math.PI * 2
        );

        ctx.fill();
        ctx.stroke();
    }
}

/* Figura */
export class FiguraPersonalizada extends Figura {

    constructor(
        posicionesCursor,
        color_relleno = "black"
    ) {

        super(
            posicionesCursor,
            null,
            color_relleno
        );
    }

    Dibujar(ctx) {

        const x = this.posicionesCursor.iniciales.x;
        const y = this.posicionesCursor.iniciales.y;

        ctx.fillStyle = this.color_relleno;
        ctx.fillRect(x + 0, y + 0, 50, 50);
        ctx.fillRect(x + 100, y + 0, 50, 50);
        ctx.fillRect(x + 50, y + 50, 50, 50);
        ctx.fillRect(x + 0, y + 100, 50, 100);
        ctx.fillRect(x + 50, y + 100, 50, 50);
        ctx.fillRect(x + 100, y + 100, 50, 100);
    }
}

/* Sticker */
export class Sticker {

    constructor(
        posicionesCursor,
        urlImagen
    ) {

        this.posicionesCursor = posicionesCursor;

        // Imagen
        this.imagen = new Image();

        this.imagen.src = urlImagen;
    }

    Dibujar(ctx) {

        if (this.imagen.complete) {

            this.dibujarImagen(ctx);

        } else {

            this.imagen.onload = () => {
                this.dibujarImagen(ctx);
            };
        }
    }

    dibujarImagen(ctx) {

        const ancho = this.imagen.width / 2;

        const alto = this.imagen.height / 2;

        ctx.drawImage(
            this.imagen,

            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,

            ancho,
            alto
        );
    }
}