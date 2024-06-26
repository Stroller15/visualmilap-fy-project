const connectToMongo = require('./db');
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","DELETE","PUT"]
  })
);

connectToMongo();
const port = 4000;

//cross-origin
app.use(cors())
app.use(express.json());


//data limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/imgup', require('./routes/imgup'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})