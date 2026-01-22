const {response, request} = require("express");

const usuariosGet = (req=request,res = response)=>{

    const {q, nombre,apikey}= req.query;
    

            res.json({
                ok:true,
                mensaje:"GET API - controlador",
                q,
                nombre,
                apikey
            })
        }

        const usuariosPost = (req,res = response)=>{

            // console.log(req);

            const {nombre, apellido,} = req.body

            res.status(201).json({
                ok: true,
                mensaje: "POST API - controlador",
                nombre,
                apellido
            })
        }

        const usuariosPut = (req,res = response)=>{

            const id = req.params.id

            res.status(201).json({
                ok:true,
                mensaje:"PUT API - controlador",
                id,
            })
        }

        const usuariosDelete = (req,res = response)=>{
            res.status(201).json({
                ok:true,
                mensaje:"DELETE API - controlador"
            })
        }

        const usuariosPatch = (req,res = response)=>{
            res.status(201).json({
                ok:true,
                mensaje:"PATCH API - controlador"
            })
        }



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}