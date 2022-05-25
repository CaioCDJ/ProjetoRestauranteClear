var express = require('express');
var users = require('./../inc/users');  
var router = express.Router();

router.get('/',function (req,res,next) {

    if(!req.session.views) req.session.views = 0;

    console.log(req.session.views++);
    
    res.render('admin/index');
});

router.get('/contacts',function(req,res,next){

    res.render('admin/contacts');
});

router.get('/emails',function(req,res,next){

    res.render('admin/emails');
});
router.get('/login',function(req,res,next){

    users.render(req,res,null);
});
// efetuando login
router.post('/login',function(req,res,next){

    if(!req.body.email)
        users.render(req,res,'Preencha o campo e-mail');
    
    else if(!req.body.password)
        users.render(req,res,'Preencha o campo senha.');
    
    else{
        users.login(req.body.email,req.body.password).then(user=>{

            req.body = {};   
            req.session.user = user;

            res.redirect('/admin');

        }).catch(err=>{
            users.render(req,res,err.message || err);
        })
    }
});

router.get('/menus',function(req,res,next){

    res.render('admin/menus');
});
router.get('/reservations',function(req,res,next){

    res.render('admin/reservations');
});

router.get('/users',function(req,res,next){

    res.render('admin/users');
});


module.exports = router;