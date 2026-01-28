const { Router } = require("express");
const { check } = require("express-validator");

// const { validarCampos } = require("../middleware/validar-campos");
// const { validarJWT } = require("../middleware/validar-jwt");
// const { esAdminRole, tieneRole } = require("../middleware/validar-roles");

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require("../middleware");

const { esRoleValido, esCorreoValido, existeUsuarioPorID } = require("../helpers/db-validators");


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

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("correo").custom(esCorreoValido),
    check("password", "El password es obligatorio y debe tener al menos 6 caracteres").isLength({ min: 6 }),
    // check("role", "El role es obligatorio").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(esRoleValido),
    validarCampos
], usuariosPost)




router.put("/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeUsuarioPorID),
        // al poner este check de rol es obligatorio que se envié el rol
        check("role").custom(esRoleValido),
        validarCampos
    ], usuariosPut)


router.delete("/:id", [
    validarJWT,
    // solo deja pasar si es usuario es admin
    // esAdminRole,
    tieneRole("ADMIN_ROL", "VENTAS_ROL"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete)

router.patch("/", usuariosPatch)

module.exports = router
