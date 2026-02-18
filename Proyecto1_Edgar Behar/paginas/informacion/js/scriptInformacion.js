const elementos_scroll = document.querySelectorAll(".aparecer_scroll");

window.addEventListener("scroll", () => {

    elementos_scroll.forEach(seccion => {

        const posicion = seccion.getBoundingClientRect().top;

        if(posicion < window.innerHeight - 100){
            seccion.classList.add("visible");
        }

    });

});
