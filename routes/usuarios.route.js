const { Router } = require("express");
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require("../controllers/usuarios.controller");



const router = Router();


//al agregar el middleware Estático, ya no es necesario agregar la ruta
// route.get("/", (req, res) => {
//     res.send("Hello World")
// })

router.get("/", usuariosGet)

// router.put("/", usuariosPut)

//para recibir parámetros en la ruta dinámicos se usa : y el nombre de la variable puede ser cualquiera
router.put("/:id", usuariosPut)

router.post("/", usuariosPost)

router.delete("/", usuariosDelete)

router.patch("/", usuariosPatch)

module.exports = router
