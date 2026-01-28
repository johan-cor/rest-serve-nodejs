require('dotenv').config()
const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../DB/confg.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = "/api/usuarios"
        this.authPath = "/api/auth"

        // Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();

        //Ruta de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        //CORS
        this.app.use(cors())

        // para leer el body en formato json
        this.app.use(express.json())

        //Lectura y parseo del body
        // this.app.use(express.json())

        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.authPath,require("../routes/auth.route"))
        this.app.use(this.usuariosPath,require("../routes/usuarios.route"))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Server corriendo en el puerto " + this.port)
        })
    }
}

module.exports = Server