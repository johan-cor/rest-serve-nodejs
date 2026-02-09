const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");

const { login, googleSignIn } = require("../controllers/login-controller");
const { validarCampos } = require("../middleware/validar-campos");
const { getCategorias, getCategoriaId, crearCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias.controller");
const { existeCategoriaPorID, esRoleValido } = require("../helpers/db-validators");
const { esAdminRole } = require("../middleware/validar-roles");

const router = Router();



router.get("/", getCategorias)



router.get("/:id", [
    check("id", "El id debe ser válido").isMongoId(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
], getCategoriaId)


// Crear categoria - privado - cualquier persona con un token valido
router.post("/", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria)


// Actualizar categoria - privado - cualquier persona con un token valido
router.put("/:id", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
], actualizarCategoria)


// Borrar categoria - privado - Admin - solo si es admin - estado: false
router.delete("/:id",[
    validarJWT,
    esAdminRole,
     check("id", "El id debe ser válido").isMongoId(),
     validarCampos,
     check("id").custom(existeCategoriaPorID),
     validarCampos,
], borrarCategoria)


module.exports = router




