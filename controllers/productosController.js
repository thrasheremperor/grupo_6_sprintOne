
const db = require('../database/models');

module.exports = {
    detalle :(req, res) => {
     db.Product.findOne({
         where : {
             id : req.params.id
         },
         include:[
             {association:"images"}
         ]

         })
        .then(producto =>{
            
            return res.render('detalleProducto',{
                title: "Detalle producto",
                producto
            })
        })
        .catch(error => res.send(error))
    },
    filter : (req,res)=>{
         db.category.findOne({
             where : {
                 id: req.params.id
             },
             include:[
                 {association: 'category_product',
                include:[{association: 'images'}]}]
         })
         .then(category =>{
             res.render('filter',{
                 productos : category.category_product,
                 title: 'Categoria',
                categoria : category.category
             })

        })
        .catch(error => console.log(error))
    }
}