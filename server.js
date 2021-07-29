const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

//require routers?
const groceriesRouter = require('./groceriesRouter.js');
const addItemRouter = require('./addItemRouter.js');
const removeItemRouter = require('./removeItemRouter.js')

//define route handers
// <- require router, which requires controller. controller does fetch/find 
app.use('/results',groceriesRouter);
app.use('/addItem',addItemRouter);     
app.use('/removeItem',removeItemRouter);    

//route handler to respond with main app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
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