
const User = require('./userModel');
const bcrypt = require('bcryptjs');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
const salt = 'random';
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(`Username signup: ${username}`)
  console.log(`Password signup: ${password}`)
  bcrypt.hash(password, 10, (err, hash) => {
    // console.log(username, password);
    if (err) return next(err);
    else {
      const newUser = new User({ username, password: hash })
      newUser.save()
        .then((data) => {

          // He's accessing data._doc._id, 
          // are we using the wrong one? - hahaha
          res.locals.id = data._id;
          return next();
        })
        .catch((err) => {
          console.log('WE THREW HERE!');
          res.render('/signup');
          return next(err);
        })
    }
  });

};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // Pull our username password (desstructure) off of the request body
  const { username, password } = req.body;
  // console.log(`Username login: ${username}`)
  // console.log(`Password login: ${password}`)
  // Then search our database with the username provided
  User.findOne({ username }, (err, user) => {
    if(err) return next(err);
    else {
      // On the object returned from that search, pull out the (hashed) password
      //bcrypt.compare(textpassword, passInDb, callback)
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) return next(err); 
        if(result) {
          // Attach to the response object the _id of the authenticated user
          res.locals.id = user._id;
          return next();
          // In the next middleware, we take that _id property from res, and set a cookie
        }
        else return next({ log: 'wrong username / password' });
      });
      // THen, hash the password that the user provided in the post request
      // Compare the two hashes. If they match, our user is valid.
      // If not, the user passed in the wrong password. Throw the error.      
    }
  })
};

module.exports = userController;