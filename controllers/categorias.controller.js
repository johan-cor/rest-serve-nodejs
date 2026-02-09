const { response, request } = require("express");
const Categoria = require("../models/categoria");


//obtener todas las categorias -paginado - total - populate

//obtener categoria - populate


// Obtener todas las categorías
const getCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query

    // console.log(typeof Number(limite), typeof Number(desde))
    if (isNaN(Number(limite)) || isNaN(Number(desde))) {
        return res.status(400).json({
            ok: false,
            mensaje: "El limite y desde deben ser números"
        })

    }

    const [categorias, total] = await Promise.all([
        Categoria.find({ estado: true }).populate("usuario", "nombre").skip(desde).limit(limite),
        Categoria.countDocuments({ estado: true })
    ])


    res.json({
        ok: true,
        mensaje: "GET API - categorias",
        total,
        categorias
    })
}

// Obtener una categoría por ID
const getCategoriaId = async (req = request, res = response) => {
    const { id } = req.params;
    
    const categoria = await Categoria.findById(id).populate("usuario", "nombre");

    // if (!categoria) {
    //     return res.status(404).json({
    //         ok: false,
    //         mensaje: "La categoría no existe"
    //     })
    // }

    res.json({
        ok: true,
        mensaje: "GET API - categoria controlador Id",
        categoria
    })
}

// Crear categoría - privado - cualquier persona con un token valido
const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            ok: false,
            mensaje: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    // Guardar en DB
    await categoria.save();


    // console.log("este es los que viene en la peticion",req);

    res.status(201).json({
        ok: true,
        mensaje: "POST API - categoría controlador",
        categoria
    })
}

// Actualizar categoría - privado - cualquier persona con un token valido
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });


    res.json({
        ok: true,
        mensaje: "PUT API - categoria",
        categoria,
    })
}

// Borrar categoría - privado - Admin - solo si es admin - estado: false
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    res.json({
        ok: true,
        mensaje: "DELETE API - categoria",
        categoria
    })
}


module.exports = {
    getCategorias,
    getCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,

};