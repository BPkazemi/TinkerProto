var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var viewData = {
    "projectsPage": [
        { 
        "profilePic": "img/profile1.jpg", 
        "title": "Sample Project 1", 
        "date": "1/1/2014", 
        "skill": "Woodwork", 
        "location": "Charlottesville, VA", 
        "difficulty": "3.0" 
         },
        { 
        "profilePic": "img/profile2.jpg", 
        "title": "Sample Project 2", 
        "date": "10/27/2014", 
        "skill": "Computer Science", 
        "location": "Seattle, WA", 
        "difficulty": "7.5" 
         },
        { 
        "profilePic": "img/profile3.jpg", 
        "title": "Sample Project 3", 
        "date": "12/1/2014", 
        "skill": "Architecture", 
        "location": "Pebble Beach, CA", 
        "difficulty": "5.0" 
         }
    ],
    "userPage": [
        {
        "name": "Bob The Builder",
        "profilePic": "img/profile1.jpg",
        "summary": "Bob has over a decade of industry experience building challenging, complex projects. Started as a construction worker for 2 years before moving up into project management.",
        "skills": [
            "Power tools - drilling, sawing", 
            "Blueprint design and analysis",
            "Project management",
            "AutoCAD"
        ],
        "contact": [
            "bobthebuilder@gmail.com",
            "123-456-7890"
        ]
        }
    ]
};

/****** Middleware ******/
app.use(express.static('public'));

app.use(function(err, req, res, next) {
    console.error( err.stack );
    res.status(500).send("Something broke!");
});
app.use(bodyParser.json());

/****** Routing ******/
app.all('*', function(req, res, next) {
    console.log('\t| Request Url:', req.originalUrl);
    console.log('\t| Request Type:', req.method);
    next();
});

/** GET **/
app.get('/', function(req, res) {
    res.render('index.html' );
});
app.get('/projects', function(req, res) {
    res.render( 'projects.html', viewData );
});
app.get('/projects/new', function(req, res) {
    res.render( 'newProject.html' );
});
app.get('/users/:id', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('user.html', viewData );
});
app.get('/users/:id/edit', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('edit.html', viewData );  
});

/** POST **/
app.post('/users/:id/edit', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    console.log('\t| POST body:', req.body);
    viewData.userPage[0].summary = req.body.summary;
    viewData.userPage[0].skills = req.body.skills.split('\n');
    viewData.userPage[0].contact = req.body.contact.split('\n');

    res.setHeader('Location', '/users/1'); 
    res.sendStatus(201); 
});
app.post('/projects/new', function(req, res) {
    console.log('\t| POST body:', req.body);

    var newProject = {
        profilePic: "img/profile4.jpg", 
        title: req.body.title,
        date: req.body.date,
        skill: req.body.skill,
        location: req.body.location,
        difficulty: req.body.difficulty
    };
    viewData.projectsPage.push( newProject );

    res.setHeader('Location', '/projects');
    res.sendStatus(201); 
});

/****** Settings  ******/
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

/****** Server ******/
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Tinker server listening at http://%s:%s', host, port);

});
