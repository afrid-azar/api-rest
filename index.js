const express = require('express');
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000


const app = express();
const produits = require("./routes/produit");
app.use('/produits',produits);

app.get('/',(req,res)=> {
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
    
    connexion.query("SELECT * FROM users",(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows);
    })

    connexion.end();
})

app.get('/jwt',(req,res)=>{

    const createTokenFromJson = (jsonData,secretKey,option = {})=>{
        try{
            const secretKey = "test";
            const token = jwt.sign(jsonData,secretKey,option)
            return token
        }catch(error){
            console.log("error : ",error_message);
            return null
        }
    }

    const jsonData = {email: "karim@benzema.com",password:"benzema"};
    const token = createTokenFromJson(jsonData);

    if(token){
        res.json({status:true,token :token});
    }else{
        res.json({token :false});
    }
    
})

app.get('/produits',(req,res)=>{
    const connexion = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'apirest'
    });
    connexion.query('SELECT * FROM produits', (erreur, resultats) => {
        if (erreur) {
            console.error("Erreur lors de la requête SELECT : " + erreur.stack);
            return;
        }

        // Affiche les résultats
        console.log('Résultats de la requête SELECT :', resultats);

        // Ferme la connexion à la base de données
        connexion.end();
    });
})

app.listen(port, ()=>{
    console.log("Serveur est en ligne");
})

