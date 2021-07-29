const cookieController = {};
const cookieParser = require('cookie-parser');

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie("secret",Math.floor(Math.random() * 100));
  res.cookie("codesmith", "hi");
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  //pull current username/password from res
  res.cookie("ssid",res.locals.id,{httpOnly: true});
  return next();

}

module.exports = cookieController;
