let usuario = getUsuarioActual();

if (!usuario || usuario.rol !== "admin") {
    window.location.href = "../login/index.html";
}

document.getElementById("jsonFile").addEventListener("change", (e) => {

    let archivo = e.target.files[0];

    if (!archivo) return;

    let reader = new FileReader();

    reader.onload = (event) => {
        try {
            let data = JSON.parse(event.target.result);

            setContenido(data);
            render();

            alert("JSON cargado correctamente");
        } catch (error) {
            alert("Error: el archivo no es un JSON válido");
        }
    };

    reader.readAsText(archivo);
});

function render() {

    let data = getContenido();
    let contenedor = document.getElementById("vistaAdmin");

    contenedor.innerHTML = "";

    if (!data || data.length === 0) {
        return;
    }

    data.forEach(item => {

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src="${item.imagen}" onerror="this.src='../assets/img/default.jpg'">
        <h3>${item.titulo}</h3>
        <p>${item.tipo}</p>
        `;  

        contenedor.appendChild(card);
    });
}

render();

document.querySelector(".cerrarSesion").addEventListener("click", cerrarSesion);