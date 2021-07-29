const fetch = require('node-fetch'); 
const fs = require('fs');
const path = require('path'); 
const groceries = require('./groceriesModel');

const groceriesController = {};

//get groceries should return array of groceries belonging to the selected category
groceriesController.getResults = (req, res, next) => {
    let cat = req.params.categoryName;
    groceries.find(
        //find method should return all results
        {[cat]: "TRUE", haveAtHome: "TRUE"},
        'name timestamp',
        (err,results) => {
            if(err) return next(err);
            res.locals.results = results;
            return next();
        }
    )
}


// call controller to find and update the grocery document matching the name from groceriesRouter
groceriesController.addGroceries = (req, res, next) => {
    
    groceries.find(
        req.params,
        (err,results) => {
            console.log(results[0]);
            if(err) return next('addgrocery error');
            //if not found, return friendly error "try a broader term!"
            if(!results[0]) {
                res.locals.message = 'try a broader term!';
                return next()
            }
            //if haveAtHome already true, error: "already on the list!"
            else if(results[0].haveAtHome === "TRUE") {
                res.locals.message = 'already on the list!';
                return next()
            };
            //if input found in Groceries, and haveAtHome = false, 
                //update haveAtHome to true
            if(results[0] && results[0].haveAtHome === "FALSE") {
                results[0].haveAtHome = "TRUE"
                results[0].save();
                res.locals.message = 'item added!';
                return next();
            }
            return next()
            //db.save()?
            
        }
    )
}

//Placeholder for deleteGroceries where id comes from component -> router
//find and update matching document and set haveAtHome to false. 
groceriesController.removeGroceries = (req, res, next) => {
    //for testing, manually return:

    // models.Groceries.findAndUpdate( // look up fin
    //     {_id: res.locals.id},
    //     {haveAtHome: false}
    // )
    

    groceries.find(
        req.params,
        (err,results) => {
            if(err) return next('addgrocery error');
            // console.log(results);
            if(results[0] && results[0].haveAtHome === "TRUE"){
                results[0].haveAtHome = false;
            }
            results[0].save();
            return next();
        }
    )
}

module.exports = groceriesController;