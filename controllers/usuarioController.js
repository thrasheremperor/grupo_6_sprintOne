const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {validationResult}= require('express-validator');

const db = require('../database/models');

module.exports  =  {
    login : ( req ,  res )  =>{
        res.render( 'user/login', { 
            title:"Log in"
        });
    },
    registro : ( req ,  res )  =>{
            res.render( 'user/registro',{
                title:"¡registrate aqui!"
            })
         },
    processRegistro : (req , res, next) =>{
        
        
        let errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.render('user/registro',{
                title : 'register',
                errores : errores.mapped(),
                
            })
        }else{
            
        const {name, lastName, password, email,birthday} = req.body;

         db.User.create({
            name,
            lastName,       
            email,
            password : bcrypt.hashSync(password,10),   
            avatar :req.files[0].filename ,
            birthday
            
        })
        .then(user => {
            console.log(user)
            res.redirect('/usuario/login')
        }) 
        .catch(error => console.log(error))
    }
},
    processLogin : (req ,res )=>{ 
        
        let errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.render('user/login',{
                title:"Log in",   
                errores : errores.mapped(),
                             
            })
        }else{
            /*aqui pido los datos password y email para comprar con los ya registrados */
            const {password, email , recordar} = req.body;

            db.User.findOne({
                where:{
                    email : email.trim()
                }
            })
            .then( user => {
                if(user){
                    if(bcrypt.compareSync(password.trim(), user.password)){
                        req.session.userPerfil = {
                            id: user.id,
                            avatar :user.avatar,
                            name : user.name,
                            lastName : user.lastName,
                            email : user.email,
                            birthday:user.birthday
                        }
                        if(recordar){
                            res.cookie('biciBikes', req.session.userPerfil,{
                                maxAge: 1000*60*60
                            });
                        }
                                           
                        return res.redirect('/usuario/miPerfil');
                    }else{
                        return res.render('user/login',{
                            title: "log in",
                            errores :{
                                invalid :{
                                    msg : "email o contraseña incorrecto"
                                }
                            }
                        })
                    }
                }}).catch(error => console.log(error))
            
            }},
            
    perfil : (req,res)=>{

        db.User.findOne({
            where:{
                id: req.session.userPerfil.id
            }
        })
        .then((perfil)=>{
            res.render( 'user/perfil',{
                title: "Mi perfil",
                perfil
            })
        })
        
    },

        //edit perfil 


    cerrar : (req,res)=>{
        req.session.destroy();
        if(req.cookies.biciBikes){
            res.cookie('biciBikes','',{
                maxAge: -1
            })
        }
        res.redirect('/')
    },


}