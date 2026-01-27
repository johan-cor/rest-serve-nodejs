const {Schema, model} = require("mongoose");


const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, "El role es obligatorio"],
        unique: true
    }
})

module.exports = model("Role", RoleSchema)
