let express = require('express');
let parser = require('body-parser');
let app = express();


app.use((req, res, next) => { //Simple logger
  let method = req.method;
  let path = req.path;
  let ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
  next();
})
//mounting body parser middleware before the routes that use it
app.use(parser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ "message": "HELLO JSON" });
  }
  else {
    res.json({ "message": "Hello json" });
  }
})

app.get('/now', function(req, res, next) {
  req.time = (new Date()).toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  res.json({ "echo": req.params.word });
});

app.get('/name', (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;
  
  res.json({ name: `${firstName} ${lastName}`});
});

app.post('/name', (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  
  res.send({ name: `${firstName} ${lastName}`})
});


module.exports = app;