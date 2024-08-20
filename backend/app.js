const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

const Post = require('./models/post');
// const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');

const app = express();

mongoose.connect('mongodb+srv://Angelo:qwerty1@cluster0.nyb57.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {
    console.log('connesso');
    
})
.catch(()=> {
    console.log('errore');
    
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

app.post('api/posts', (req,res,next) => {
    console.log('mimmo');
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    console.log(post);
    
    // post.save();
res.status(201).json({
    message: 'si ok',
})

})

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {id: 'epdm4242', 
        title:'primo post server',
         content:'contenuto server side'
        },
        {id: 'epdmdsdsds4242', 
        title:'secondo post server',
        content:'contenuto'
        }
    ]
    res.status(200).json({
        message: ' success',
        posts: posts
    })
});


module.exports = app;