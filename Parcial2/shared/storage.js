
function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual"));
}

function setUsuarioActual(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "../login/index.html";
}

function getContenido() {
    return JSON.parse(localStorage.getItem("contenido")) || [];
}

function setContenido(data) {
    localStorage.setItem("contenido", JSON.stringify(data));
}