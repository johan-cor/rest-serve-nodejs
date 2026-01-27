const {Schema, model} = require("mongoose");


const CorreoSchema = Schema({
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    }
})

module.exports = model("Correo", CorreoSchema)
