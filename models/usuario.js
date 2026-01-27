
// {
//     nombre: String,
//     correo: String,
//     password: String,
//     img: String,
//     role: String,
// estado: Boolean,
//     google: Boolean
// }



const {Schema, model} = require("mongoose");


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL', 'USER_ROL'],
        default: 'USER_ROL'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model("Usuario", UsuarioSchema);