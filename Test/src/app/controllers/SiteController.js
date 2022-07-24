const connection = require('../database/connection');
const queries = require('../database/queries/select');

class SiteController{
    index(req, res){
        connection.query(queries.list, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('home', {courses: results});
            }
        })
    };

    ViewAdd(req, res){
        res.render('add');
    };
    add(req, res){
        const data = {
            name : req.body.name,
            description : req.body.description,
            image : req.body.image,
            price : req.body.price,
            gender : req.body.gender
        }
        connection.query(queries.add(data), (err, result) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    };

    ViewEdit(req, res){
        connection.query(queries.one(req.params.id),(err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.render('edit', {courses : result});
            }
        });
    };


    update(req, res){
        const data = {
            id : req.params.id,
            name : req.body.name,
            description : req.body.description,
            image : req.body.image,
            price : req.body.price,
            gender : req.body.gender
        }
        connection.query(queries.update(data), (err, result) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }

    delete(req, res) {
        connection.query(queries.delete(req.params.id), (err, result) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }
}
module.exports = new SiteController;