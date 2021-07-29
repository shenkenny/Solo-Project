const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  //session is valid if req.locals.id === res.cookie.id
  // console.log(res.locals.id);
  console.log(res.locals.id);
  if(res.locals.id) return next()
  else return next('invalid session');

};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  const session = new Session({ cookieId: res.locals.id });
  session.save()
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    })
};

module.exports = sessionController;
