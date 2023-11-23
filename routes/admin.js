const express = require('express');
const router = express.Router();

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
