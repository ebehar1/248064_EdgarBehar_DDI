document.getElementById("btnLogin").addEventListener("click", () => {

    let correo = document.getElementById("loginCorreo").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (!correo || !password) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = getUsuarios();

    let usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (!usuario) {
        alert("Correo o contraseña incorrectos");
        return;
    }

    setUsuarioActual(usuario);

    if (usuario.rol === "admin") {
        window.location.href = "../admin/admin.html";
    } else {
        window.location.href = "../usuario/usuario.html";
    }
});