const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;
var app = express();


app.set('view engine', 'hbs');  
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

// app.use((request,response,next)=>{
//     response.render('maintainence.hbs');

// });

app.use(express.static(__dirname + '/public'));


app.use((request,response, next)=>{
    var now = new Date().toString();
    var log =`${now}: Method ${request.method} URL ${request.url} IP ${request.ip}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });      
     next();

});




app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: "Home page!!",
        welcomeMsg: "welcome to the node app",

    })
});


app.get('/about', (request, response) => {
    // response.send("<h1>About Page</h1>");
    response.render('about.hbs', {
        pageTitle: 'About Page'

    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Unable to handle request"
    });
});

app.get('/projects',(request,response)=>{
    response.render('projects.hbs',{
        pageTitle: 'Project Page'
    });
});

app.get('/users/:userid/books/:bookid/',(req,res)=>{
    res.send(req.params);
});

app.listen(port, () => {
    console.log('Server is up in port 3000');
});