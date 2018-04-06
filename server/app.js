
const express= require('express');
const morgan = require('morgan');
const passport = require('passport');
const helmet = require('helmet')
const flash = require('connect-flash')
const cors = require('cors')
const app = express();

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/FlawlessEdge');
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/OnlineJudge')
>>>>>>> de47f8a422464366c38b6fd80665e7d903de8199
app.use(express.static(__dirname+'/public/'));
const bodyParser = require('body-parser');
app.use(cors())
app.use( bodyParser.json({limit:'100mb'}) );
app.use(bodyParser.urlencoded({   
    limit:'100mb'  ,
    extended: true
}));

const cookieParser = require('cookie-parser');
const session = require('cookie-session');

app.use(morgan('dev'));
var expiryDate = new Date(Date.now() + 60 * 60 * 1000)
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'localhost:8080',
      expires: expiryDate
    }
  }))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(helmet());

app.use(express.static(__dirname+'/public'))
//Routes
const contest = require('./routes/contest');
const ide = require('./routes/ide');
const users = require('./routes/users');
const solutions = require('./routes/solution');
const rankings = require('./routes/ranking');
const submission = require('./routes/submission');
const practice = require('./routes/practice');
//const viewSolution = require('./routes/viewsolution');

app.use('/ide',ide);
app.use('/contest', contest);
app.use('/users', users);
app.use('/solution',solutions);
app.use('/rankings',rankings);
app.use('/submission',submission);
app.use('/practice',practice);
//app.use('/viewsolution',viewSolution);


// app.post('/',(req,res)=>{
//   console.log(req.body.Hello);
//   res.send('hdfdhfh');
// })

const port = process.env.PORT || 80;
app.listen(port, '0.0.0.0');
console.log('magic is started at ' + port)

module.exports={app}
