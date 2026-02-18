const boton_modo = document.querySelector(".boton_modo");

boton_modo.addEventListener("click", () => {

    if(document.body.style.background === "black"){
        document.body.style.background = "white";
        document.body.style.color = "black";
    }else{
        document.body.style.background = "black";
        document.body.style.color = "white";
    }

});
