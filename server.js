const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./userController.js');
const cookieController = require('./cookieController.js');
const sessionController = require('./sessionController.js');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//require routers?
const groceriesRouter = require('./groceriesRouter.js');
const addItemRouter = require('./addItemRouter.js');
const removeItemRouter = require('./removeItemRouter.js')

//define route handers
// <- require router, which requires controller. controller does fetch/find 
app.use('/results',groceriesRouter);
app.use('/addItem',addItemRouter);     
app.use('/removeItem',removeItemRouter);    

//handle root
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './login/index.html'))
});

//handle login route
app.get('/login', cookieController.setCookie, (req, res) => {
     res.sendFile(path.resolve(__dirname, './login/index.html'))
});
  
//handle signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, './login/signup.html'))
});

app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
// what should happen here on successful sign up?
    return res.redirect('/home');
});


/**
 * login
 */
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.isLoggedIn, (req, res) => {
// what should happen here on successful log in?
// request should include username/pass
    return res.redirect('/home');

});


// /**
//  * Authorized routes
//  */
// app.get('/secret', userController.getAllUsers, (req, res) => {

// /**
// * The previous middleware has populated `res.locals` with users
// * which we will pass this in to the res.render so it can generate
// * the proper html from the `secret.ejs` template
// */
//     res.sendFile(path.resolve(__dirname, './login/secret.html'))

// });

//route handler to respond with main app
app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, './login/home.html'))
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
    return res.sendStatus(404);
  });
  
/**
 * configire express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err,req,res,next) => {
    let defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' }, 
    };
    let errorObj = Object.assign(defaultErr,err);
    console.log(errorObj.log);
    res.locals.message = errorObj.message;
    console.log('ERROR-YO:', err);
    const errorStatus = errorObj.status || 500;
    return res.status(errorStatus).send(res.locals.message);
});

//start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;