var express = require('express'); //create web server listen port 
var morgan = require('morgan'); //http logs
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config = {
    user:'KIRUBAKARANS',
    database:'KIRUBAKARANS',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD

    
};
var pool = new Pool(config);

var app = express();
app.use(bodyParser.json());
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
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test',function(err,result) {
    if(err) {
        res.status(500).send(err.toString());
    }else{
        res.send(JSON.stringify(result.rows));
    }
});
});
app.get('/hash/:input', function(req,res) {
    var hashedString=hash(req.params.input,'this is some random string');
   res.send(hashedString);
   
   // res.sendFile(path.join(__dirname,'ui','index.html'));
});
function hash(input,salt){
    
    var hashed=crypto.pbkdf2Sync(input,salt,100000,512,'sha512');
    return ["pbkdf2Sync","1000",salt,hashed.toString('hex')].join('$');
}
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.RandomBytes(128).toString('hex');
    var doString=hash(password,salt);
    pool.query('INSERT INTO "user"(username,password) VALUES ($1, $2)',[username,dbString],function(err,result){
        
    if(err) {
        res.status(500).send(err.toString());
    }else{
        res.send('user created successfully' + username);
    }
});    
});

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
var names=[];
app.get('/submit-name',function(req,res) {//url://submit-name?name=xxxx
  var name=req.query.name;
   names.push(name);
   //JSON java script object notion object to strings
   
   res.send(JSON.stringify(names));
});
app.get('/articles/:articlename', function(req,res) {
    
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articlename + "'",function(err,result) {
    if(err) {
        res.status(500).send(err.toString());
    }else{
        if(result.rows.length === 0){
        res.status(404).send('article not found');
        }else {
     var articleData=result.rows[0];
     res.send(createtemplate(articleData));
    }    
    }
}); 
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
