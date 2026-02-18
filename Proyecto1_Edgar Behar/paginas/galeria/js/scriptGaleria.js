const lista_tarjetas = document.querySelectorAll(".tarjeta");

const boton_animar = document.querySelector(".boton_animar");

boton_animar.addEventListener("click", () => {

    lista_tarjetas.forEach((tarjeta, indice) => {

        tarjeta.style.transform = `translateY(${indice * 10}px) rotate(5deg)`;

    });

});
