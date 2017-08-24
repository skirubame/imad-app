var express = require('express'); //create web server listen port 
var morgan = require('morgan'); //http logs
var path = require('path');

var app = express();
var articleOne={
    title:'Article-One',
    heading:'Article',
    date:'August 17',
    content:    `<p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p> `
    
};

function createtemplate(data){
 title=data.title;
 heading=data.heading;
 date=data.date;
 content=data.content;

var template = 
 `<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name = "viewport" content="width-device-width, intial-scale=2"/>
          <link href="/ui/style.css" rel="stylesheet" />
            </head>
<body>
<div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
    
        </h3>
    <div>
        ${date}
    </div>    
    <div>
      ${content}
    </div>
</div>
    </body>`
    
;
return template;
}

app.use(morgan('combined'));
//what to do 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//sendfile function to get content
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-one', function(req,res) {
    res.send(createtemplate(articleOne));
});
app.get('/article-two', function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/article-two',function(req,res) {
    res.send("This is article-two");
});

app.get('/article-three',function(req,res) {
    res.send("This is article-three");
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port,function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
