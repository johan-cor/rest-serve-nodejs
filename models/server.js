require('dotenv').config()
const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../DB/confg.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.path = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios",
        }

        // Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();

        //Ruta de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middleware() {

        //CORS
        this.app.use(cors())

        // para leer el body en formato json
        this.app.use(express.json())

        //Lectura y parseo del body
        // this.app.use(express.json())

        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.path.auth, require("../routes/auth.route")),
            this.app.use(this.path.buscar, require("../routes/buscar.route")),
            this.app.use(this.path.categorias, require("../routes/categorias.route")),
            this.app.use(this.path.productos, require("../routes/productos.route")),
            this.app.use(this.path.usuarios, require("../routes/usuarios.route"))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Server corriendo en el puerto " + this.port)
        })
    }
}

module.exports = Server