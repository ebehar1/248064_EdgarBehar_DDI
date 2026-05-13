document.getElementById("btnRegistro").addEventListener("click", () => {

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let rol = document.getElementById("rol").value;
    let fotoInput = document.getElementById("foto");

    if (!nombre || !correo || !password || !confirmPassword) {
        alert("Completa todos los campos");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let archivo = fotoInput.files[0];

    if (archivo && !archivo.type.startsWith("image/")) {
        alert("Solo se permiten imágenes");
        return;
    }

    let usuarios = getUsuarios();

    function guardar(foto = "") {
        usuarios.push({
            nombre,
            correo,
            password,
            rol,
            foto
        });

        setUsuarios(usuarios);

        alert("Cuenta creada correctamente");

        window.location.href = "../login/index.html";
    }

    if (archivo) {
        let reader = new FileReader();
        reader.onload = () => guardar(reader.result);
        reader.readAsDataURL(archivo);
    } else {
        guardar();
    }
});