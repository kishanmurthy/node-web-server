const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((request,response, next)=>{
    var now = new Date().toString();
    var log =`${now}: Method ${request.method} URL ${request.url} IP ${request.ip}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })       
     next();

});

app.use((request,response,next)=>{
    response.render('maintainence.hbs');

});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return 'test';
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    // response.send({
    //      name: 'kishan',
    //     likes: [
    //         'Biking','Cities'
    //     ]
    // }); 
    response.render('home.hbs', {
        pageTitle: "Home page!!",
        welcomeMsg: "welcome to home page",

    })
});


app.get('/about', (request, response) => {
    // response.send("<h1>About Page</h1>");
    response.render('about.hbs', {
        pageTitle: 'About Page',

    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Unable to handle request"
    });
    // response.send("Error");

});


app.listen(3000, () => {
    console.log('Server is up in port 3000');
});