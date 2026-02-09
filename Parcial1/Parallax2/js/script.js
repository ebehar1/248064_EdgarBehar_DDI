const titulo = document.querySelector("#titulo");
const sylveon = document.querySelector("#sylveon");

window.addEventListener("scroll", (event)=>{
    titulo.style.right = window.scrollY * 3 + "px";
    sol.style.bottom = window.scrollY * 3 + "px";
    pikachu.style.right = window.scrollY * .5 + "px";
    sylveon.style.left = window.scrollY * .5 + "px";
    nubes.style.left = window.scrollY * 3 + "px";

});