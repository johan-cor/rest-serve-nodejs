const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");

const { login, googleSignIn } = require("../controllers/login-controller");
const { validarCampos } = require("../middleware/validar-campos");
const { getCategorias, getCategoriaId, crearCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias.controller");
const { existeCategoriaPorID, esRoleValido, existeProductoPorID } = require("../helpers/db-validators");
const { esAdminRole } = require("../middleware/validar-roles");
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controller");

const router = Router();

//obtener productos
router.get("/", obtenerProductos)

//obtener producto por id
router.get("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
], obtenerProducto)

//crear producto
router.post("/", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "El nombre es obligatorio").isMongoId(),
    check("categoria", "El nombre es obligatorio").custom(existeCategoriaPorID),
    validarCampos,
], crearProducto)

//actualizar producto
router.put("/:id", [
    validarJWT,
    // check("categoria", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
], actualizarProducto)

//eliminar producto
router.delete("/:id", [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
], eliminarProducto)


module.exports = router