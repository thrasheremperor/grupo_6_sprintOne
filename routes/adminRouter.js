const express = require('express');
const router = express.Router();

const upload = require('../middleware/imgBikes')
const userCheck = require ('../middleware/userCheck');

const {cargar,creado, editar, borrar,editado,cargado} = require('../controllers/adminController');

router.get('/formCarga',userCheck ,cargar); /*ruta a formulario de carga de producto / ruta lista*/
router.post('/formCarga', upload.any(), /*userCheck, */cargado); /*este es para almacenar los patos enviados por el formulario / ruta lista */

router.get('/list',creado); /*ruta donde se encuentra los productos publicados / ruta lista*/

router.get('/editar/:id',userCheck,editar)/*ruta para productos ya editados / ruta lista */
router.put('/editado/:id', editado); /*ruta para edicion de producto / ruta lista*/

router.delete('/eliminar/:id', borrar); /*ruta para borrar un producto */



module.exports = router;