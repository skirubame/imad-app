var express = require('express'); //create web server listen port 
var morgan = require('morgan'); //http logs
var path = require('path');

var app = express();
var articles = {
    'article-one': {title:'Article-One',
    heading:'Article',
    date:'August 17',
    content:    ` <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
` 
},
'article-two' :{title:'Article-two',
    heading:'Article',
    date:'August 17',
    content:    ` <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p> `
    },
 
 'article-three': {title:'Article-three',
    heading:'Article',
    date:'August 17',
    content:    ` <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p>
         <p>
            THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed THis is the content to be diplayed
            
        </p> `
    }

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
var counter=0;

app.get('/counter',function(req,res) {
  counter=counter+1;
  res.send(counter.toString());
});
app.use(morgan('combined'));
//what to do 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//sendfile function to get content
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
//var names=[];
//app.get('/submit-name',function(req,res) {//url://submit-name?name=xxxx
  // var name=req.query.name;
   //names.push(name);
   //JSON java script object notion object to strings
   
   //res.send(JSON.stringify(names));
//});
app.get('/:articlename', function(req,res) {
    var article=req.params.articlename;
    res.send(createtemplate(articles[article]));
});

app.get('/ui/main.js', function (req,res) {
    res.sendFile(path.join(__dirname,'ui','main.js'));
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
