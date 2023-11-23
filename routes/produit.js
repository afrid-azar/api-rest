const express = require('express');
const router = express.Router();  
const mysql = require("mysql");

const connexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'apirest'
});

connexion.connect((err)=>{
    if(err){
        console.log("Erreur de onnexion : "+err.stack);
        return ;
    }
    console.log("Connexion reussi à la Bdd!");
});

router.get("/", (req,res)=>{
    connexion.query("Select * FROM produits ",(err, rows,fileds)=>{
        if(err) throw err;
        res.json(rows);
    })
})

router.get("/:id", (req,res)=>{
    const productID = req.params.id;
    connexion.query("Select * FROM produits where id = ?", [productID],(err, rows,fileds)=>{
        if(err) throw err;
        res.json(rows);
    })
})

module.exports = router;