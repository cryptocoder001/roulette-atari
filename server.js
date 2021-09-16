const express = require("express");
const http = require("http");
const BetRoute = require('./routes/api/betRoute');
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Passport middleware
const server = http.createServer(app);

app.use('/api/bet', BetRoute)

app.use(express.static(__dirname+"/build"));
app.get('/',function(req, res)
        {
            res.sendFile(__dirname + '/index.html');
        });

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

server.listen(port, () => console.log(`Listening on port ${port}`));
