let usuario = getUsuarioActual();

if (!usuario) {
    window.location.href = "../login/index.html";
}

document.getElementById("nombreUsuario").textContent = usuario.nombre;
document.getElementById("fotoPerfil").src = usuario.foto || "../assets/img/default.jpg";

function render() {

    let data = getContenido();
    let contenedor = document.getElementById("contenido");

    contenedor.innerHTML = "";

    if (!data || data.length === 0) return;

    data.forEach(item => {

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${item.imagen}" onerror="this.src='../assets/img/default.jpg'">
            <h3>${item.titulo}</h3>
            <p class="tipo">${item.tipo}</p>
            <p class="desc">${item.descripcion}</p>
        `;

        contenedor.appendChild(card);
    });
}

render();

document.querySelector(".cerrarSesion").addEventListener("click", cerrarSesion);

let modal = document.getElementById("modalPerfil");

document.getElementById("fotoPerfil").addEventListener("click", () => {
    modal.classList.remove("oculto");
});

document.getElementById("cancelarPerfil").addEventListener("click", () => {
    modal.classList.add("oculto");
});

document.getElementById("guardarPerfil").addEventListener("click", () => {

    let nuevoNombre = document.getElementById("nuevoNombre").value.trim();
    let nuevaFotoInput = document.getElementById("nuevaFoto");

    let usuarios = getUsuarios();
    let usuarioActual = getUsuarioActual();

    let usuarioIndex = usuarios.findIndex(u => u.correo === usuarioActual.correo);

    function actualizar(foto = usuarioActual.foto) {

        if (nuevoNombre) {
            usuarios[usuarioIndex].nombre = nuevoNombre;
            usuarioActual.nombre = nuevoNombre;
        }

        usuarios[usuarioIndex].foto = foto;
        usuarioActual.foto = foto;

        setUsuarios(usuarios);
        setUsuarioActual(usuarioActual);

        document.getElementById("nombreUsuario").textContent = usuarioActual.nombre;
        document.getElementById("fotoPerfil").src = usuarioActual.foto;

        modal.classList.add("oculto");
    }

    if (nuevaFotoInput.files[0]) {
        let archivo = nuevaFotoInput.files[0];

        if (!archivo.type.startsWith("image/")) {
            alert("Solo imágenes");
            return;
        }

        let reader = new FileReader();
        reader.onload = () => actualizar(reader.result);
        reader.readAsDataURL(archivo);
    } else {
        actualizar();
    }
});