const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignIn } = require("../controllers/login-controller");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();


router.post("/login",[
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    validarCampos
] ,login)

router.post("/google",[
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos
] ,googleSignIn)


module.exports = router




