const fs = require('fs');
const path = require('path');
const db = require('../database/models');


module.exports = {
    cargar :(req, res) => {
        res.render('admin/formCarga', { /*aqui se puede visualizar un formulario de carga de un nuevo producto */
            title: 'Cargar producto'
        }) /*renderiso  la vista de formCarga.ejs */
    },
    cargado:(req,res,next)=>{    
        const {name,modelId,description,makeId,colorId,discountId} = req.body
          db.Product.create({
              name,
              price,
              description,
              makeId,
              modelId,
              categoryId,
              imageId,
              colorId,
              discountId
          })
          .then( product => {
              db.Image.create({
                  Image : req.files[0].filename,
                  productId : product.id
              })
              return res.redirect('/admin/list')
          })
          .catch(error => res.send(error))
    },
    
    creado:(req,res) =>{
         res.render('admin/productsList',{ /*aqui se puede visualizar los productos publicados con sus opciones */
            title:'Carga realizada',
        
        })
    },
    editar:(req,res)=>{  /*la opcion de edicion en producto se envuentra en la vista productEditado */
        
        
    },   
    editado:(req,res)=>{ /*aqui se puede visualizar los productos ya editados */
    },
    borrar: (req,res)=>{ /*la opcion de borara en producto se envuentra en la vista productList */
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/list')
        })
        .catch(error => res.send(error))
    }
}