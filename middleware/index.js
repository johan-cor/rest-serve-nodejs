const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../middleware/validar-roles");
const validarArchivo  = require("../middleware/validar-archivo");



module.exports = {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
    ...validarArchivo
}