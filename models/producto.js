const {Schema, model} = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, "El estado es obligatorio"]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    },
    description : {
        type: String,
        default: ""
    },
    disponible : {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: ""
    }
})

ProductoSchema.method('toJSON', function() {
    const { __v, estado, ...object } = this.toObject();
    return object;
})

module.exports = model("Producto", ProductoSchema)
