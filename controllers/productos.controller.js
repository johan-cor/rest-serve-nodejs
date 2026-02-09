const { response, request } = require("express");
const Producto = require("../models/producto");



//obtener productos
const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query

    if (isNaN(Number(limite)) || isNaN(Number(desde))) {
        return res.status(400).json({
            ok: false,
            mensaje: "El limite y desde deben ser números"
        })

    }

    const [productos, total] = await Promise.all([
        Producto.find({ estado: true }).populate("usuario", "nombre").populate("categoria", "nombre").skip(desde).limit(limite),
        Producto.countDocuments({ estado: true })
    ])

    res.json({
        ok: true,
        msg: "obtener productos",
        total,
        productos
    })
}

//obtener producto por id
const obtenerProducto = async (req, res) => {

    const { id } = req.params;

    const producto = await Producto.findById(id).populate("usuario", "nombre").populate("categoria", "nombre");

    res.json({
        ok: true,
        msg: "obtener producto por id",
        producto
    })
}

//crear producto
const crearProducto = async (req, res) => {
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            ok: false,
            msg: `El producto ${body.nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.json({
        ok: true,
        msg: "crear producto",
        producto: data
    })
}

//actualizar producto
const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    if(body.nombre){
        body.nombre = body.nombre.toUpperCase();
    }

    body.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, body, {new: true});

    res.json({
        ok: true,
        msg: "actualizar producto",
        producto
    })
}

//eliminar producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        ok: true,
        msg: "eliminar producto",
        producto
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}