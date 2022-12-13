const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear servidor/app express
const app = express();

//Database
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Cors
app.use(cors())


//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//multer storage disk and rename img
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
//img Storage
app.use(multer({ storage }).single('imgURL'));



//Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/demos', require('./routes/demos.routes'));


//tes6
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})